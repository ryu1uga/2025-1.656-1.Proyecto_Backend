"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../generated/prisma");
const NewsController = () => {
    const router = express_1.default.Router();
    // GET / -> todas las noticias o filtradas por estado
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const state = req.query.state;
        try {
            let news;
            if (state === undefined) {
                news = yield prisma.news.findMany({
                    include: { attachment: true }
                });
            }
            else if (typeof state === "string" && !isNaN(Number(state))) {
                news = yield prisma.news.findMany({
                    where: { state: Number(state) },
                    include: { attachment: true }
                });
            }
            else {
                resp.status(400).json({
                    success: false,
                    data: "Should send a valid state"
                });
                return;
            }
            resp.status(200).json({
                success: true,
                data: news
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching news",
                    error: e
                }
            });
        }
    }));
    // GET /:id -> noticia por id
    router.get("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const id = Number(req.params.id);
        if (isNaN(id)) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            });
            return;
        }
        try {
            const news = yield prisma.news.findUnique({
                where: { id },
                include: { attachment: true }
            });
            if (!news) {
                resp.status(404).json({
                    success: false,
                    data: "News not found"
                });
                return;
            }
            resp.status(200).json({
                success: true,
                data: news
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching news",
                    error: e
                }
            });
        }
    }));
    // POST / -> crear noticia
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const { title, text, attachment } = req.body;
        if (!title || !text) {
            resp.status(400).json({
                success: false,
                data: "Missing required fields: title and text"
            });
            return;
        }
        try {
            const newNews = yield prisma.news.create({
                data: {
                    title,
                    text,
                    state: 1
                }
            });
            if (attachment && attachment.url) {
                yield prisma.newsAttachment.create({
                    data: {
                        url: attachment.url,
                        newsId: newNews.id
                    }
                });
            }
            resp.status(201).json({
                success: true,
                data: "News created successfully"
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while creating news",
                    error: e
                }
            });
        }
    }));
    // PUT /:id -> actualizar noticia
    router.put("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const id = Number(req.params.id);
        const { title, text, state, attachment } = req.body;
        if (isNaN(id)) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            });
            return;
        }
        try {
            yield prisma.news.update({
                where: { id },
                data: {
                    title,
                    text,
                    state
                }
            });
            if (attachment) {
                yield prisma.newsAttachment.deleteMany({ where: { newsId: id } });
                if (attachment.url) {
                    yield prisma.newsAttachment.create({
                        data: {
                            url: attachment.url,
                            newsId: id
                        }
                    });
                }
            }
            resp.status(200).json({
                success: true,
                data: "News updated successfully"
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while updating news",
                    error: e
                }
            });
        }
    }));
    // DELETE /:id -> eliminar noticia
    router.delete("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const id = Number(req.params.id);
        if (isNaN(id)) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            });
            return;
        }
        try {
            const existingNews = yield prisma.news.findUnique({ where: { id } });
            if (!existingNews) {
                resp.status(404).json({
                    success: false,
                    data: "News not found"
                });
                return;
            }
            yield prisma.news.delete({ where: { id } });
            resp.status(200).json({
                success: true,
                data: "News deleted successfully"
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while deleting news",
                    error: e
                }
            });
        }
    }));
    return router;
};
exports.default = NewsController;
