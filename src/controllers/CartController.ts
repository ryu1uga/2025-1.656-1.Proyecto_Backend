import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const CartController = () => {
  const router = express.Router();
  const prisma = new PrismaClient();

  // Agregar un solo juego al carrito
  router.post("/add", async (req: Request, res: Response) => {
    const { userId, gameId } = req.body;

    if (!userId || !gameId) {
      res.status(400).json({
        success: false,
        message: "userId y gameId son requeridos",
      });
      return
    }

    try {
      const exists = await prisma.cart.findFirst({
        where: { userId, gameId },
      });

      if (exists) {
        res.status(200).json({
          success: true,
          message: "El juego ya está en el carrito",
        });
        return
      }

      await prisma.cart.create({
        data: { userId, gameId },
      });

      res.status(201).json({
        success: true,
        message: "Juego agregado al carrito",
      });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      res.status(500).json({
        success: false,
        message: "Error interno al agregar al carrito",
      });
    } finally {
      await prisma.$disconnect();
    }
  });

  // Actualizar el carrito completo (reemplazar todos los juegos)
  router.put("/", async (req: Request, res: Response) => {
    const { userId, games } = req.body;

    if (!userId || !Array.isArray(games)) {
      res.status(400).json({
        success: false,
        message: "userId y lista de juegos son requeridos",
      });
      return
    }

    try {
      // Borrar el carrito actual
      await prisma.cart.deleteMany({ where: { userId } });

      // Insertar los nuevos juegos
      for (const gameId of games) {
        await prisma.cart.create({
          data: { userId, gameId },
        });
      }

      res.status(200).json({
        success: true,
        message: "Carrito actualizado exitosamente",
      });
    } catch (error) {
      console.error("Error al actualizar carrito:", error);
      res.status(500).json({
        success: false,
        message: "Error interno al actualizar carrito",
      });
    } finally {
      await prisma.$disconnect();
    }
  });

  // Obtener carrito de un usuario
  router.get("/", async (req: Request, res: Response) => {
    const userId = Number(req.query.userId);

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "userId es requerido como query param",
      });
      return
    }

    try {
      const carrito = await prisma.cart.findMany({
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
    } catch (error) {
      console.error("Error al obtener carrito:", error);
      res.status(500).json({
        success: false,
        message: "Error interno al obtener carrito",
      });
    } finally {
      await prisma.$disconnect();
    }
  });

  router.delete("/", async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ success: false, message: "userId requerido" });
      return;
    }

    try {
      await prisma.cart.deleteMany({
        where: { userId }
      });

      res.status(200).json({ success: true, message: "Carrito vaciado correctamente" });
      return;
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      res.status(500).json({ success: false, message: "Error interno del servidor" });
      return;
    } finally {
      await prisma.$disconnect();
    }
  });


  return router;
};

export default CartController;
