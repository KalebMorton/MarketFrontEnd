// all the routes will be tied to here
import { Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import Account from "./Account";
import Login from "./Login";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import Register from "./Register";

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
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Account" element={<Account/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/ProductDetails" element={<ProductDetails/>}/>
                    <Route path="/ProductList" element={<ProductList/>}/>
                    <Route path="/Register" element={<Register/>}/>
                </Routes>
            </div>
        </>
    )
}