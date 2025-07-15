
import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const CategoryController = () => {
    const router = express.Router()
    
    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        try {
            const categories = await prisma.category.findMany()

            resp.status(200).json({
                success: true,
                data: categories
            })

        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching categorie",
                    error: e
                }
            })
        }
    })

    return router;
};

export default CategoryController