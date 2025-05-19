export interface Game {
    id: number;
    name: string;
}

interface Props {
    juegos: Game[];
}

const GameList = ({ juegos }: Props) => {
    return (
        <ul className="list-group mt-4">
            {juegos.map((juego) => (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={juego.id}>
                    <div className="ms-2 me-auto">{juego.name}</div>
                </li>
            ))}
        </ul>
    );
};

export default GameList;