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
const GamesController = () => {
    const router = express_1.default.Router();
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const state = req.query.state;
        try {
            if (state == undefined) {
                const games = yield prisma.game.findMany({
                    relationLoadStrategy: "join",
                    include: {
                        sells: true,
                        ratings: true,
                        category: true,
                        images: true,
                        trailers: true,
                        attachment: true
                    }
                });
                resp.status(200).json({
                    success: true,
                    data: games
                });
                return;
            }
            if (typeof state != "string" || isNaN(Number(state))) {
                resp.status(400).json({
                    success: false,
                    data: "Should send a valid state"
                });
                return;
            }
            const games = yield prisma.game.findMany({
                relationLoadStrategy: "join",
                where: { state: Number(state) },
                include: {
                    sells: true,
                    ratings: true,
                    category: true,
                    images: true,
                    trailers: true,
                    attachment: true
                }
            });
            resp.status(200).json({
                success: true,
                data: games
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching games",
                    error: e
                }
            });
        }
    }));
    router.get("/sells", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        try {
            const games = yield prisma.game.findMany({
                relationLoadStrategy: "join",
                include: {
                    sells: true,
                    ratings: true,
                    category: true,
                    images: true,
                    trailers: true,
                    attachment: true,
                    _count: {
                        select: { sells: true }
                    }
                },
                orderBy: {
                    sells: {
                        _count: "desc"
                    }
                }
            });
            resp.status(200).json({
                success: true,
                data: games
            });
            return;
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching games",
                    error: e
                }
            });
        }
    }));
    router.get("/ratings", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        try {
            const ratingsAvg = yield prisma.rating.groupBy({
                by: ["gameId"],
                _avg: {
                    rating: true
                },
                orderBy: {
                    _avg: {
                        rating: "desc"
                    }
                }
            });
            const avgMap = new Map();
            ratingsAvg.forEach(r => {
                var _a;
                avgMap.set(r.gameId, (_a = r._avg.rating) !== null && _a !== void 0 ? _a : 0);
            });
            const allGames = yield prisma.game.findMany({
                relationLoadStrategy: "join",
                include: {
                    sells: true,
                    ratings: true,
                    category: true,
                    images: true,
                    trailers: true,
                    attachment: true
                }
            });
            const gamesWithAvg = allGames.map(game => {
                var _a;
                const avgRating = (_a = avgMap.get(game.id)) !== null && _a !== void 0 ? _a : 0;
                return Object.assign(Object.assign({}, game), { avgRating });
            });
            const orderedGames = gamesWithAvg.sort((a, b) => b.avgRating - a.avgRating);
            resp.status(200).json({
                success: true,
                data: orderedGames
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching games",
                    error: e
                }
            });
        }
    }));
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
            const game = yield prisma.game.findUnique({
                relationLoadStrategy: "join",
                where: { id: id },
                include: {
                    sells: true,
                    ratings: true,
                    category: true,
                    images: true,
                    trailers: true,
                    attachment: true
                }
            });
            if (!game) {
                resp.status(404).json({
                    success: false,
                    data: "Game not found"
                });
                return;
            }
            resp.status(200).json({
                success: true,
                data: game
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching game",
                    error: e
                }
            });
        }
    }));
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const game = req.body;
        if (!game.name || !game.price || !game.category || !game.description || !game.categoryId) {
            resp.status(400).json({
                success: false,
                data: "Missing required fields"
            });
            return;
        }
        if (typeof game.price != "number" || isNaN(game.price)) {
            resp.status(400).json({
                success: false,
                data: "Price should be a valid number"
            });
            return;
        }
        try {
            const newGame = yield prisma.game.create({
                data: {
                    name: game.name,
                    price: game.price,
                    description: game.description,
                    company: game.company || "Unknown",
                    state: 1,
                    category: { connect: { id: game.category } }
                }
            });
            if (game.images && Array.isArray(game.images)) {
                yield prisma.gameImage.createMany({
                    data: game.images.map((url) => ({
                        url,
                        gameId: newGame.id
                    }))
                });
            }
            if (game.trailers && Array.isArray(game.trailers)) {
                yield prisma.gameTrailer.createMany({
                    data: game.trailers.map((url) => ({
                        url,
                        gameId: newGame.id
                    }))
                });
            }
            if (game.attachment) {
                yield prisma.gameAttachment.create({
                    data: {
                        url: game.attachment.url,
                        gameId: newGame.id
                    }
                });
            }
            resp.status(201).json({
                success: true,
                data: "Game created without any error"
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while creating game",
                    error: e
                }
            });
        }
    }));
    router.put("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const id = Number(req.params.id);
        const modifiedGame = req.body;
        if (isNaN(id)) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            });
            return;
        }
        if ('id' in modifiedGame) {
            delete modifiedGame.id;
        }
        if ('price' in modifiedGame && (typeof modifiedGame.price !== "number" || isNaN(modifiedGame.price))) {
            resp.status(400).json({
                success: false,
                data: "Price should be a valid number"
            });
            return;
        }
        try {
            yield prisma.game.update({
                where: { id },
                data: {
                    name: modifiedGame.name,
                    price: modifiedGame.price,
                    description: modifiedGame.description,
                    company: modifiedGame.company,
                    state: modifiedGame.state,
                    category: modifiedGame.category ? { connect: { id: modifiedGame.category } } : undefined
                }
            });
            if ('images' in modifiedGame && Array.isArray(modifiedGame.images)) {
                yield prisma.gameImage.deleteMany({ where: { gameId: id } });
                if (modifiedGame.images.length > 0) {
                    yield prisma.gameImage.createMany({
                        data: modifiedGame.images.map((url) => ({
                            url,
                            gameId: id
                        }))
                    });
                }
            }
            if ('trailers' in modifiedGame && Array.isArray(modifiedGame.trailers)) {
                yield prisma.gameTrailer.deleteMany({ where: { gameId: id } });
                if (modifiedGame.trailers.length > 0) {
                    yield prisma.gameTrailer.createMany({
                        data: modifiedGame.trailers.map((url) => ({
                            url,
                            gameId: id
                        }))
                    });
                }
            }
            if ('attachment' in modifiedGame) {
                yield prisma.gameAttachment.delete({ where: { gameId: id } });
                if (modifiedGame.attachment.length > 0) {
                    yield prisma.gameAttachment.create({
                        data: {
                            url: modifiedGame.attachment.url,
                            gameId: id
                        }
                    });
                }
            }
            resp.status(200).json({
                success: true,
                data: "Game updated successfully"
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while modifying game",
                    error: e
                }
            });
        }
    }));
    router.delete("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const id = req.params.id;
        if (!id || isNaN(Number(id))) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            });
            return;
        }
        try {
            const game = yield prisma.game.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!game) {
                resp.status(404).json({
                    success: false,
                    data: "Game not found"
                });
                return;
            }
            yield prisma.game.delete({
                where: {
                    id: Number(id)
                }
            });
            resp.status(200).json({
                msg: "Game deleted without any error"
            });
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while deleting game",
                    error: e
                }
            });
        }
    }));
    return router;
};
exports.default = GamesController;
