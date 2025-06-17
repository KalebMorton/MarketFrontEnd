// all the routes will be tied to here
import { Link } from "react-router-dom";


export default function Navigations(){


    return (
        <>
        <nav>
            <div id="navbar">
                <Link to="/">Home</Link>
                <br></br>
                <Link to="/account">Account</Link>
                <br></br>
                <Link to="/login">Login</Link>
                <br></br>
                <Link to="/productDetails">Products</Link>
                <br></br>
                <Link to="/register">Register</Link>
            </div>    
        </nav>
            
        </>
    )
}