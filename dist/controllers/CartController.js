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
const CartController = () => {
    const router = express_1.default.Router();
    const prisma = new prisma_1.PrismaClient();
    // Agregar un solo juego al carrito
    router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, gameId } = req.body;
        if (!userId || !gameId) {
            res.status(400).json({
                success: false,
                message: "userId y gameId son requeridos",
            });
            return;
        }
        try {
            const exists = yield prisma.cart.findFirst({
                where: { userId, gameId },
            });
            if (exists) {
                res.status(200).json({
                    success: true,
                    message: "El juego ya está en el carrito",
                });
                return;
            }
            yield prisma.cart.create({
                data: { userId, gameId },
            });
            res.status(201).json({
                success: true,
                message: "Juego agregado al carrito",
            });
        }
        catch (error) {
            console.error("Error al agregar al carrito:", error);
            res.status(500).json({
                success: false,
                message: "Error interno al agregar al carrito",
            });
        }
        finally {
            yield prisma.$disconnect();
        }
    }));
    // Actualizar el carrito completo (reemplazar todos los juegos)
    router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, games } = req.body;
        if (!userId || !Array.isArray(games)) {
            res.status(400).json({
                success: false,
                message: "userId y lista de juegos son requeridos",
            });
            return;
        }
        try {
            // Borrar el carrito actual
            yield prisma.cart.deleteMany({ where: { userId } });
            // Insertar los nuevos juegos
            for (const gameId of games) {
                yield prisma.cart.create({
                    data: { userId, gameId },
                });
            }
            res.status(200).json({
                success: true,
                message: "Carrito actualizado exitosamente",
            });
        }
        catch (error) {
            console.error("Error al actualizar carrito:", error);
            res.status(500).json({
                success: false,
                message: "Error interno al actualizar carrito",
            });
        }
        finally {
            yield prisma.$disconnect();
        }
    }));
    // Obtener carrito de un usuario
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = Number(req.query.userId);
        if (!userId) {
            res.status(400).json({
                success: false,
                message: "userId es requerido como query param",
            });
            return;
        }
        try {
            const carrito = yield prisma.cart.findMany({
                where: { userId },
                include: {
                    game: {
                        include: {
                            attachment: true,
                            category: true,
                        },
                    },
                },
            });
            const juegos = carrito.map(c => c.game);
            res.status(200).json({ carrito: juegos });
        }
        catch (error) {
            console.error("Error al obtener carrito:", error);
            res.status(500).json({
                success: false,
                message: "Error interno al obtener carrito",
            });
        }
        finally {
            yield prisma.$disconnect();
        }
    }));
    router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({ success: false, message: "userId requerido" });
            return;
        }
        try {
            yield prisma.cart.deleteMany({
                where: { userId }
            });
            res.status(200).json({ success: true, message: "Carrito vaciado correctamente" });
            return;
        }
        catch (error) {
            console.error("Error al vaciar el carrito:", error);
            res.status(500).json({ success: false, message: "Error interno del servidor" });
            return;
        }
        finally {
            yield prisma.$disconnect();
        }
    }));
    return router;
};
exports.default = CartController;
