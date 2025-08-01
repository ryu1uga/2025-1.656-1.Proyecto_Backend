import express, { Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import GamesController from "./controllers/GamesController"
import UsersController from "./controllers/UsersController"
import NewsController from "./controllers/NewsController"
import SellsController from "./controllers/SellsController"
import CartController from "./controllers/CartController"
import CategoryController from "./controllers/CategoryController"

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
app.use("/users", UsersController())
app.use("/news", NewsController())
app.use("/sells", SellsController())
app.use("/cart", CartController())
app.use("/categories", CategoryController())

app.listen(PORT, () => {
    console.log(`Se inicio servidor en http://localhost:${PORT}/`)
})