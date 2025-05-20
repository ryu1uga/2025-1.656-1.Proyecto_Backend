import { useState } from "react";
import { Link } from "react-router-dom";
import type { Game } from "../../components/game/GameList";
import "./GamePage.css";

const GamePage = () => {
    const [games, setGames] = useState<Game[]>(() => {
        const juegosGuardadosStr = localStorage.getItem("games");
        if (juegosGuardadosStr) {
            try {
                return JSON.parse(juegosGuardadosStr);
            } catch {
                return [];
            }
        }
        return [];
    });

    const deleteGame = (id: number) => {
        const actualizados = games.filter(game => game.id !== id);
        setGames(actualizados);
        localStorage.setItem("games", JSON.stringify(actualizados));
    };

    return (
        <div className="container">
            <h1>Available Games</h1>
            <div className="d-flex justify-content-around flex-wrap">
                <Link to="/game/add" id="addGame" className="btn btn-secondary">
                    Add Game
                </Link>
            </div>
            <div className="d-grid gap-2">
                {games.map((game) => (
                    <div className="row" key={game.id}>
                        <div className="col-10 d-flex align-items-center">
                            <span className="btn btn-outline-dark w-100 text-start">{game.name}</span>
                        </div>
                        <div className="col-2 d-flex align-items-center">
                            <button className="btn delete" onClick={() => deleteGame(game.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamePage;
