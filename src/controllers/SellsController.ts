
import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import nodemailer from "nodemailer";
import { transporter } from "../utils/mailer"

const SellsController = () => {
    const router = express.Router()
    const generarCodigoNumerico = (): number => {
    return Math.floor(10000000 + Math.random() * 90000000); // genera entre 10000000 y 99999999
    };


    router.post("/game-code", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient();
        const {userId} = req.body

        
        if(userId == undefined){
            resp.status(400).json({
                success:false,
                message: "userId faltante" 
            })
        }
         try {
            const user = await prisma.user.findUnique({
            where: { id: userId },
            });

            if (!user || !user.email) {
             resp.status(404).json({
                success: false,
                message: "Usuario no encontrado o sin email",
            });
            return
            }

            const purchases = await prisma.sell.findMany({
                where: { userId },
                include: {game: true}
            });

            const updatedSells = await Promise.all(
                purchases.map(async (venta) => {
                if (!venta.code) {
                    const nuevoCodigo = generarCodigoNumerico();
                    return await prisma.sell.update({
                    where: { id: venta.id },
                    data: { code: nuevoCodigo },
                    include: { game: true },
                    });

                }
                return venta;
                })
            );

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

            await transporter.sendMail({
                from: `"Proyecto PW" <20211953@aloe.ulima.edu.pe>`,
                to: user.email,
                subject: "Tus claves de juegos - LP Store",
                html: html
            })

            resp.status(200).json({
                success: true,
                message: "Claves generadas y correo enviado.",
                data: claves,
            });
            } catch (error) {
            console.error("Error en /game-code:", error);
            resp.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
            } finally {
            await prisma.$disconnect();
            }
        });

    router.post("/checkout", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient();
        const { userId } = req.body;

        if (userId == undefined) {
            resp.status(400).json({ 
                success: false, message: "Falta userId" 
            });
            return
        }

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.email) {
         resp.status(404).json(
            { 
                success: false, message: "Usuario no encontrado o sin email"
             });
            return
        }

        // 1. Obtener carrito del usuario
        const cartItems = await prisma.cart.findMany({
                where: { userId },
                include: { game : true }
                
            });

        if (cartItems.length == 0) {
            resp.status(400).json({ 
                success: false, message: "Carrito vacío" 
            });
            return
        }

        // 2. Crear ventas con código
        const sells = await Promise.all(
            cartItems.map(async (item) => {
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
            })
        );
        


        // 3. Eliminar el carrito
        await prisma.cart.deleteMany({
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

        await transporter.sendMail({
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

            } catch (error) {
            console.error("Error en /checkout", error);
            resp.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
            } finally {
            await prisma.$disconnect();
            }
        });
        return router;
    };
export default SellsController
