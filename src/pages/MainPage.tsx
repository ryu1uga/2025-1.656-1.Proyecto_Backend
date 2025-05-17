import { Link } from "react-router-dom"
import "./MainPage.css"

const MainPage = () => {

    return <div className="container">
        <h1>Admin Page</h1>
        <div className="d-grid gap-2">
            <Link to={ "" } className="btn">User</Link>
            <Link to={ "" } className="btn">News</Link>
            <Link to={ "" } className="btn">Sales data</Link>
            <Link to={ "/game" } className="btn">Game</Link>
            <Link to={ "" } className="btn">Category</Link>
        </div>
    </div>
}

export default MainPage