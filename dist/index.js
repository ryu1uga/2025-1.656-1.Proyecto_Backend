"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const games_1 = require("./games");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.get("/", (req, resp) => {
    resp.send("Endpoint raiz de Backend");
});
app.get("/games", (req, resp) => {
    const games = games_1.gamesList;
    const state = req.query.state;
    if (state == undefined) {
        resp.json(games);
        return;
    }
    const filteredGames = [];
    for (let game of games) {
        if (game.state.toString() == state) {
            filteredGames.push(game);
        }
    }
    resp.json(filteredGames);
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
    resp.json(gameFounded);
});
app.listen(PORT, () => {
    console.log(`Se inicio servidor en puerto ${PORT}`);
});
