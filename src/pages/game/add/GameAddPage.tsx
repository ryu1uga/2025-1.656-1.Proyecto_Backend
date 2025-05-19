import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameAddPage.css";
import type { Game } from "../../../components/game/GameList";

const GameAddPage = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleAddGame = () => {
        if (!name.trim()) return;

        const nuevoJuego: Game = {
            id: Date.now(),
            name: name.trim()
        };

        // Guardar nuevo juego sin usar JSON manualmente
        const juegosAnterioresStr = localStorage.getItem("games");
        const juegos = juegosAnterioresStr ? [...eval(juegosAnterioresStr)] : [];
        juegos.push(nuevoJuego);
        localStorage.setItem("games", `[${juegos.map(g => `{"id":${g.id},"name":"${g.name}"}`).join(",")}]`);

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
            <button className="btn addGame" onClick={handleAddGame}>
                Add Game
            </button>
        </div>
    );
};

export default GameAddPage;