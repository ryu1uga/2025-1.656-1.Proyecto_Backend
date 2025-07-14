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
const mailer_1 = require("../utils/mailer");
const SellsController = () => {
    const router = express_1.default.Router();
    const generarCodigoNumerico = () => {
        return Math.floor(10000000 + Math.random() * 90000000); // genera entre 10000000 y 99999999
    };
    router.post("/game-code", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const { userId } = req.body;
        if (userId == undefined) {
            resp.status(400).json({
                success: false,
                message: "userId faltante"
            });
        }
        try {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user || !user.email) {
                resp.status(404).json({
                    success: false,
                    message: "Usuario no encontrado o sin email",
                });
                return;
            }
            const purchases = yield prisma.sell.findMany({
                where: { userId },
                include: { game: true }
            });
            const updatedSells = yield Promise.all(purchases.map((venta) => __awaiter(void 0, void 0, void 0, function* () {
                if (!venta.code) {
                    const nuevoCodigo = generarCodigoNumerico();
                    return yield prisma.sell.update({
                        where: { id: venta.id },
                        data: { code: nuevoCodigo },
                        include: { game: true },
                    });
                }
                return venta;
            })));
            const claves = updatedSells.map((venta) => ({
                title: venta.game.name,
                key: venta.code,
            }));
            const html = `
                <h2>Gracias por tu compra, ${user.name}:</h2>
                <ul>
                ${claves
                .map((c) => `<li><strong>${c.title}</strong>: ${c.key}</li>`)
                .join("")}
                </ul>
                <p>¡Disfruta tus juegos!</p>
            `;
            yield mailer_1.transporter.sendMail({
                from: `"Proyecto PW" <20211953@aloe.ulima.edu.pe>`,
                to: user.email,
                subject: "Tus claves de juegos - LP Store",
                html: html
            });
            resp.status(200).json({
                success: true,
                message: "Claves generadas y correo enviado.",
                data: claves,
            });
        }
        catch (error) {
            console.error("Error en /game-code:", error);
            resp.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
        finally {
            yield prisma.$disconnect();
        }
    }));
    router.post("/checkout", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const prisma = new prisma_1.PrismaClient();
        const { userId } = req.body;
        if (userId == undefined) {
            resp.status(400).json({
                success: false, message: "Falta userId"
            });
            return;
        }
        try {
            const user = yield prisma.user.findUnique({ where: { id: userId } });
            if (!user || !user.email) {
                resp.status(404).json({
                    success: false, message: "Usuario no encontrado o sin email"
                });
                return;
            }
            // 1. Obtener carrito del usuario
            const cartItems = yield prisma.cart.findMany({
                where: { userId },
                include: { game: true }
            });
            if (cartItems.length == 0) {
                resp.status(400).json({
                    success: false, message: "Carrito vacío"
                });
                return;
            }
            // 2. Crear ventas con código
            const sells = yield Promise.all(cartItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                const codigo = generarCodigoNumerico();
                return prisma.sell.create({
                    data: {
                        userId: userId,
                        gameId: item.gameId,
                        amount: item.game.price,
                        code: codigo
                    },
                    include: { game: true }
                });
            })));
            // 3. Eliminar el carrito
            yield prisma.cart.deleteMany({
                where: { userId }
            });
            // 4. Preparar correo
            const claves = sells.map((venta) => ({
                title: venta.game.name,
                key: venta.code
            }));
            const html = `
            <h2>Gracias por tu compra, ${user.name}:</h2>
            <ul>
                ${claves.map(c => `<li><strong>${c.title}</strong>: ${c.key}</li>`).join("")}
            </ul>
            <p>¡Disfruta tus juegos!</p>
            `;
            yield mailer_1.transporter.sendMail({
                from: `"Proyecto PW" <20211953@aloe.ulima.edu.pe>`,
                to: user.email,
                subject: "Tus claves de juegos - LP Store",
                html: html
            });
            resp.status(200).json({
                success: true,
                message: "Compra procesada correctamente y claves enviadas.",
                data: claves
            });
        }
        catch (error) {
            console.error("Error en /checkout", error);
            resp.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
        finally {
            yield prisma.$disconnect();
        }
    }));
    return router;
};
exports.default = SellsController;
