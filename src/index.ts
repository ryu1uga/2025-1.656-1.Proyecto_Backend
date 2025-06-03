import express, {Request, Response} from "express"
import dotenv from "dotenv"
import { Game, gamesList } from "./games"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.get("/", (req : Request, resp : Response) => {
    resp.send("Endpoint raiz de Backend")
})

//Games CRUD

app.get("/games", (req : Request, resp : Response) => {
    const games = gamesList
    const state = req.query.state
    let filteredGames = []
    if (state == undefined)
    {
        filteredGames = games
    }
    else
    {
        for (let game of games)
        {
            if (game.state.toString() == state)
            {
                filteredGames.push(game)
            }
        }
    }
    
    resp.status(200).json({
        success : true,
        data : filteredGames
    })
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

    if (gameFounded == null)
    {
        resp.status(404).json({
            success : false,
            data : "Game not found"
        })
    }

    resp.status(200).json({
        success : true,
        data : gameFounded
    })
})

app.listen(PORT, () => {
    console.log(`Se inicio servidor en puerto ${PORT}`)
})