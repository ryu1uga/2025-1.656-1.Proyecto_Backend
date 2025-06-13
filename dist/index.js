"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const games_1 = require("./games");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(body_parser_1.default.json());
app.get("/", (req, resp) => {
    resp.send("Endpoint raiz de Backend");
});
//Games CRUD
app.get("/games", (req, resp) => {
    const games = games_1.gamesList;
    const state = req.query.state;
    let filteredGames = [];
    if (state == undefined) {
        filteredGames = games;
    }
    else {
        for (let game of games) {
            if (game.state.toString() == state) {
                filteredGames.push(game);
            }
        }
    }
    resp.status(200).json({
        success: true,
        data: filteredGames
    });
});
app.get("/games/:id", (req, resp) => {
    const games = games_1.gamesList;
    const id = req.params.id;
    let gameFounded = null;
    for (let game of games) {
        if (game.id.toString() == id) {
            gameFounded = game;
            break;
        }
    }
    if (gameFounded == null) {
        resp.status(404).json({
            success: false,
            data: "Game not found"
        });
        return;
    }
    resp.status(200).json({
        success: true,
        data: gameFounded
    });
});
app.post("/games", (req, resp) => {
    const game = req.body;
    const games = games_1.gamesList;
    games.push({
        id: new Date().getTime(),
        name: game.name,
        rating: 0,
        price: game.price,
        category: game.category,
        description: game.description,
        coments: game.coments || [],
        images_url: game.images_url || [],
        trailer: game.trailer || [],
        state: 1
    });
    resp.status(200).json({
        success: true,
        data: "Game created without any error"
    });
});
app.listen(PORT, () => {
    console.log(`Se inicio servidor en puerto ${PORT}`);
});
