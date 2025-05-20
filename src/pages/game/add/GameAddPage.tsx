import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameAddPage.css";
import type { Game } from "../../../components/game/GameList";

const GameAddPage = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const addGame = () => {
        if (!name.trim()) return;

        const nuevoJuego: Game = {
            id: Date.now(),
            name: name.trim()
        };

        // Guardar nuevo juego utilizando JSON.parse() y JSON.stringify
        const juegosAnterioresStr = localStorage.getItem("games");
        const juegos = juegosAnterioresStr ? JSON.parse(juegosAnterioresStr) : [];
        juegos.push(nuevoJuego);
        localStorage.setItem("games", JSON.stringify(juegos)); // Guarda el array actualizado con JSON.stringify

        navigate("/game");
    };

    return (
        <div className="container mt-4">
            <h1 className="title">Add a New Game</h1>
            <input
                className="form-control mb-3"
                placeholder="Enter game name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="btn addGame" onClick={addGame}>
                Add Game
            </button>
        </div>
    );
};

export default GameAddPage;
