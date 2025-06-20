import express, { Request, Response } from "express"
import { gamesList } from "../games"
import { PrismaClient } from "../generated/prisma"

const GamesController = () => {
    const router = express.Router()

    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const state = req.query.state
        
        try {
            if (state == undefined) {
                const games = await prisma.game.findMany()
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
                where: {
                    state : Number(state)
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
                where : {
                    id : id
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
        
        if (!game.name || !game.price || !game.category || !game.description) {
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
            await prisma.game.create({
                data: {
                    name: game.name,
                    rating: 0,
                    price: game.price,
                    category: game.category,
                    description: game.description,
                    sells: game.sells || 0,
                    company: game.company || "Unknown",
                    state: 1,
                    coments: game.coments || [],
                    images_url: game.images_url || [],
                    trailer: game.trailer || []
                }
            })

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
        const id = req.params.id
        const modifiedGame = req.body

        if (typeof modifiedGame.price != "number" || isNaN(modifiedGame.price)) {
            resp.status(400).json({
                success: false,
                data: "Price should be a valid number"
            })
            return
        }

        if (!id || isNaN(Number(id)))
        {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            })
            return
        }

        if ('id' in modifiedGame) {
            delete modifiedGame.id
        }

        try {
            const game = await prisma.game.update({
                where: {
                    id: Number(id)
                },
                data: modifiedGame
            })

            if (!game)
            {
                resp.status(404).json({
                    success: false,
                    data: "Game not found"
                })
                return
            }

            resp.status(200).json({
                success: true,
                data: "Game updated without any error"
            })
        }
        catch (e) {
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