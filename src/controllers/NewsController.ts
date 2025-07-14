import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const NewsController = () => {
    const router = express.Router()
    
    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const state = req.query.state
        
        try {
            if (state == undefined) {
                const news = await prisma.news.findMany(
                    
                )
                resp.status(200).json({
                    success: true,
                    data: news
                })
                return
            }
            if (typeof state != "string" || isNaN(Number(state)))
            {
                resp.status(400).json({
                    success: false,
                    data: "Should send a valid state"
                })
                return
            }
        
            const news = await prisma.news.findMany(

            )

            resp.status(200).json({
                success: true,
                data: news
            })
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching news",
                    error: e
                }
            })
        }

    })

    

    return router
}

export default NewsController