import { useState } from "react";

interface GameAddProps {
    agregar: (nombre: string) => void;
}

const GameForm = (props : GameAddProps) => {
    const [nombre, setNombre] = useState("");

    return (
        <div className="row mt-3">
            <div className="col-md-10">
                <input
                    className="form-control"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="col-md-2">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => {
                        if (nombre.trim() !== "") {
                            props.agregar(nombre.trim());
                            setNombre("");
                        }
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default GameForm;