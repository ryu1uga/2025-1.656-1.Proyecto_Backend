import express, { Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import GamesController from "./controllers/GamesController"

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", (req: Request, resp: Response) => {
    resp.send("Endpoint raiz de Backend")
})

app.use("/games", GamesController())

app.listen(PORT, () => {
    console.log(`Se inicio servidor en puerto ${PORT}`)
})