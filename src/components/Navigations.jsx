// all the routes will be tied to here
import { Link } from "react-router-dom";


export default function Navigations(){


    return (
        <>
            <h2>Navigations</h2>
            <div id="navbar">
                <Link to="/Account">Account</Link>
                <br></br>
                <Link to="/Login">Login</Link>
                <br></br>
                <Link to="/ProductDetails">Product Details</Link>
                <br></br>
                <Link to="/ProductList">Product List</Link>
                <br></br>
                <Link to="/Register">Register</Link>
            </div>
        </>
    )
}