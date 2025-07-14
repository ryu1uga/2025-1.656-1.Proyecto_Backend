"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const GamesController_1 = __importDefault(require("./controllers/GamesController"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const NewsController_1 = __importDefault(require("./controllers/NewsController"));
const SellsController_1 = __importDefault(require("./controllers/SellsController"));
const CartController_1 = __importDefault(require("./controllers/CartController"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.get("/", (req, resp) => {
    resp.send("Endpoint raiz de Backend");
});
app.use("/games", (0, GamesController_1.default)());
app.use("/users", (0, UsersController_1.default)());
app.use("/news", (0, NewsController_1.default)());
app.use("/sells", (0, SellsController_1.default)());
app.use("/cart", (0, CartController_1.default)());
app.listen(PORT, () => {
    console.log(`Se inicio servidor en http://localhost:${PORT}/`);
});
