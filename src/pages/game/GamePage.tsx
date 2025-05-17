import "./GamePage.css"

const GamePage = () => {

    return <body className="container">
        <h1>Available Games</h1>
        <div className="d-flex justify-content-around flex-wrap">
            <a href="./AdminGameAddPage/AdminGameAddPage.html" id="addGame" className="btn btn-secondary">Add Game</a>
        </div>
        <div className="d-grid gap-2">
            <div className="row">
                <div className="col-10 d-flex align-items-center">
                    <a href="./AdminGameDetailPage/AdminGameDetailPage.html" className="btn game">Game name 1</a>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <button className="btn delete" type="button">Delete</button>
                </div>
            </div>
            <div className="row">
                <div className="col-10 d-flex align-items-center">
                    <a href="./AdminGameDetailPage/AdminGameDetailPage.html" className="btn game">Game name 2</a>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <button className="btn delete" type="button">Delete</button>
                </div>
            </div>
            <div className="row">
                <div className="col-10 d-flex align-items-center">
                    <a href="./AdminGameDetailPage/AdminGameDetailPage.html" className="btn game">Game name 3</a>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <button className="btn delete" type="button">Delete</button>
                </div>
            </div>
            <div className="row">
                <div className="col-10 d-flex align-items-center">
                    <a href="./AdminGameDetailPage/AdminGameDetailPage.html" className="btn game">Game name 4</a>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <button className="btn delete" type="button">Delete</button>
                </div>
            </div>
            <div className="row">
                <div className="col-10 d-flex align-items-center">
                    <a href="./AdminGameDetailPage/AdminGameDetailPage.html" className="btn game">Game name 5</a>
                </div>
                <div className="col-2 d-flex align-items-center">
                    <button className="btn delete" type="button">Delete</button>
                </div>
            </div>
        </div>
    </body>
}

export default GamePage