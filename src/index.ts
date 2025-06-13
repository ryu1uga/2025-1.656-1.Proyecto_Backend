import express, { Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import { Game, gamesList } from "./games"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.get("/", (req: Request, resp: Response) => {
    resp.send("Endpoint raiz de Backend")
})

//Games CRUD

app.get("/games", (req: Request, resp: Response) => {
    const games = gamesList
    const state = req.query.state
    let filteredGames = []
    if (!state) {
        filteredGames = games
    }
    else {
        for (let game of games) {
            if (game.state.toString() == state) {
                filteredGames.push(game)
            }
        }
    }

    resp.status(200).json({
        success: true,
        data: filteredGames
    })
})

app.get("/games/:id", (req: Request, resp: Response) => {
    const games = gamesList
    const id = req.params.id
    for (let game of games) {
        if (game.id.toString() == id) {
            resp.status(200).json({
                success: true,
                data: game
            })
            return
        }
    }

    resp.status(404).json({
        success: false,
        data: "Game not found"
    })
})

app.post("/games", (req: Request, resp: Response) => {
    const game = req.body
    const games = gamesList

    games.push({
        id: new Date().getTime(),
        name: game.name,
        rating: 0,
        price: game.price,
        category: game.category,
        description: game.description,
        coments: game.coments || [],
        sells: game.sells || 0,
        company: game.company || "Unknown",
        images_url: game.images_url || [],
        trailer: game.trailer || [],
        state: 1
    })

    resp.status(200).json({
        success: true,
        data: "Game created without any error"
    })
})

app.put("/games", (req: Request, resp: Response) => {
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

app.delete("/games/:id", (req: Request, resp: Response) => {
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

app.listen(PORT, () => {
    console.log(`Se inicio servidor en puerto ${PORT}`)
})