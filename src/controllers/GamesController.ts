import express, { Request, Response } from "express"
import { gamesList } from "../games"
import { PrismaClient } from "../generated/prisma"

const GamesController = () => {
    const router = express.Router()

    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const state = req.query.state

        if (state == undefined) {
            const games = await prisma.game.findMany()
            resp.status(200).json({
                success: true,
                data: games
            })
            return
        }

        if (isNaN(Number(state)))
        {
            resp.status(400).json({
                success: false,
                data: "Invalid value for game state"
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
    })

    router.get("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const id = Number(req.params.id)

        if (isNaN(id))
        {
            resp.status(404).json({
                success: false,
                data: "Game not found"
            })
            return
        }

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
    })

    router.post("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const gameData = req.body

        try {
            const game = await prisma.game.create({
                data: {
                    name: gameData.name,
                    rating: 0,
                    price: gameData.price,
                    category: gameData.category,
                    description: gameData.description,
                    sells: gameData.sells || 0,
                    company: gameData.company || "Unknown",
                    state: 1,
                    coments: gameData.coments || [],
                    images_url: gameData.images_url || [],
                    trailer: gameData.trailer || []
                }
            })

            resp.status(200).json({
                success: true,
                data: game
            })
        }
        catch (e) {
            resp.status(400).json({
                success: false,
                msg: "An error occurred while creating game"
            })
        }
    })

    router.put("/", (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const modifiedGame = req.body
        const games = gamesList

        if (!modifiedGame.id) {
            resp.status(400).json({
                success: false,
                data: "Should send any id to search the game"
            })
            return
        }

        for (let game of games) {
            if (game.id.toString() == modifiedGame.id) {
                game.name = modifiedGame.name ? modifiedGame.name : game.name
                game.price = modifiedGame.price ? modifiedGame.price : game.price
                game.category = modifiedGame.category ? modifiedGame.category : game.category
                game.description = modifiedGame.description ? modifiedGame.description : game.description
                game.state = modifiedGame.state ? modifiedGame.state : game.state

                resp.status(200).json({
                    success: true,
                    data: "Game modified without any error"
                })
                return
            }
        }

        resp.status(404).json({
            success: false,
            data: "Game not found"
        })
    })

    router.delete("/:id", (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const games = gamesList
        const id = req.params.id

        let index: number | null = null
        let counter = 0

        for (let game of games) {
            if (game.id.toString() == id) {
                index = counter
                break
            }
            counter++
        }

        if (index == null) {
            resp.status(400).json({
                success: false,
                data: "Should send a valid id"
            })
            return
        }

        gamesList.splice(index, 1)

        resp.status(200).json({
            success: true,
            data: "Game deleted without any error"
        })
    })

    return router
}

export default GamesController