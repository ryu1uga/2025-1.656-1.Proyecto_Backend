import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const GamesController = () => {
    const router = express.Router()

    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const state = req.query.state
        
        try {
            if (state == undefined) {
                const games = await prisma.game.findMany({
                    relationLoadStrategy : "join",
                    include: {
                        sells: true,
                        ratings: true,
                        category: true,
                        images: true,
                        trailers: true
                    }
                })
                resp.status(200).json({
                    success: true,
                    data: games
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
        
            const games = await prisma.game.findMany({
                relationLoadStrategy : "join",
                where: { state : Number(state) },
                include: {
                    sells: true,
                    ratings: true,
                    category: true,
                    images: true,
                    trailers: true
                }
            })

            resp.status(200).json({
                success: true,
                data: games
            })
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching games",
                    error: e
                }
            })
        }
    })

    router.get("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = Number(req.params.id)

        if (isNaN(id))
        {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            })
            return
        }

        try {
            const game = await prisma.game.findUnique({
                relationLoadStrategy : "join",
                where : { id : id },
                include: {
                    sells: true,
                    ratings: true,
                    category: true,
                    images: true,
                    trailers: true
                }
            })

            if (!game) {
                resp.status(404).json({
                    success: false,
                    data: "Game not found"
                })
                return
            }

            resp.status(200).json({
                success: true,
                data: game
            })
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while searching game",
                    error: e
                }
            })
        }
    })

    router.post("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const game = req.body
        
        if (!game.name || !game.price || !game.category || !game.description || !game.categoryId) {
            resp.status(400).json({
                success: false,
                data: "Missing required fields"
            })
            return
        }

        if (typeof game.price != "number" || isNaN(game.price)) {
            resp.status(400).json({
                success: false,
                data: "Price should be a valid number"
            })
            return
        }

        try {
            const newGame = await prisma.game.create({
            data: {
                name: game.name,
                price: game.price,
                description: game.description,
                company: game.company || "Unknown",
                state: 1,
                category: { connect: { id: game.category } }
            }
            })

            if (game.images && Array.isArray(game.images)) {
            await prisma.gameImage.createMany({
                data: game.images.map((url: string) => ({
                    url,
                    gameId: newGame.id
                }))
            })
            }

            if (game.trailers && Array.isArray(game.trailers)) {
            await prisma.gameTrailer.createMany({
                data: game.trailers.map((url: string) => ({
                    url,
                    gameId: newGame.id
                }))
            })
            }

            resp.status(201).json({
                success: true,
                data: "Game created without any error"
            })
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while creating game",
                    error: e
                }
            })
        }
    })

    router.put("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = Number(req.params.id)
        const modifiedGame = req.body

        if (isNaN(id)) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            })
            return
        }

        if ('id' in modifiedGame) {
            delete modifiedGame.id
        }

        if ('price' in modifiedGame && (typeof modifiedGame.price !== "number" || isNaN(modifiedGame.price))) {
            resp.status(400).json({
                success: false,
                data: "Price should be a valid number"
            })
            return
        }

        try {
            await prisma.game.update({
                where: { id },
                data: {
                    name: modifiedGame.name,
                    price: modifiedGame.price,
                    description: modifiedGame.description,
                    company: modifiedGame.company,
                    state: modifiedGame.state,
                    category: modifiedGame.category ? { connect: { id: modifiedGame.category } } : undefined
                }
            })

            if ('images' in modifiedGame && Array.isArray(modifiedGame.images)) {
                await prisma.gameImage.deleteMany({ where: { gameId: id } })
                if (modifiedGame.images.length > 0) {
                    await prisma.gameImage.createMany({
                        data: modifiedGame.images.map((url: string) => ({
                            url,
                            gameId: id
                        }))
                    })
                }
            }

            if ('trailers' in modifiedGame && Array.isArray(modifiedGame.trailers)) {
                await prisma.gameTrailer.deleteMany({ where: { gameId: id } })
                if (modifiedGame.trailers.length > 0) {
                    await prisma.gameTrailer.createMany({
                        data: modifiedGame.trailers.map((url: string) => ({
                            url,
                            gameId: id
                        }))
                    })
                }
            }

            resp.status(200).json({
                success: true,
                data: "Game updated successfully"
            })
        } catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while modifying game",
                    error: e
                }
            })
        }
    })

    router.delete("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = req.params.id

        if (!id || isNaN(Number(id))) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            })
            return
        }
        
        try {
            const game = await prisma.game.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!game) {
                resp.status(404).json({
                    success: false,
                    data: "Game not found"
                })
                return
            }

            await prisma.game.delete({
                where: {
                    id: Number(id)
                }
            })

            resp.status(200).json({
                msg: "Game deleted without any error"
            })
        }
        catch (e) {
            resp.status(500).json({
                success: false,
                data: {
                    msg: "Unexpected error occurred while deleting game",
                    error: e
                }
            })
        }
    })

    return router
}

export default GamesController