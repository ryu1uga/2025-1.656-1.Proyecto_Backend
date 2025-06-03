import express, {Request, Response} from "express"
import dotenv from "dotenv"
import { Game, gamesList } from "./games"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raiz de Backend")
})

app.get("/games", (req : Request, resp : Response) => {
    const games = gamesList
    const state = req.query.state
    if (state == undefined)
    {
        resp.json(games)
        return
    }
    const filteredGames = []
    for (let game of games)
    {
        if (game.state.toString() == state)
        {
            filteredGames.push(game)
        }
    }
    resp.json(filteredGames)
})

app.get("/games/:id", (req : Request, resp : Response) => {
    const games = gamesList
    const id = req.params.id
    let gameFounded : Game | null = null
    for (let game of games)
    {
        if (game.id.toString() == id)
        {
            gameFounded = game
            break
        }
    }
    resp.json(gameFounded)
})

app.listen(PORT, () => {
    console.log(`Se inicio servidor en puerto ${PORT}`)
})