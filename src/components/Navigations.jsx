
import { Link } from "react-router-dom";


export default function Navigations({token, setToken}){
    const handleLogout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    return (
        <>
        <nav>
            <div id="navbar">
                <Link to="/">Home</Link>
                <br></br>
                <Link to="/products">Ducks</Link>
                <br></br>
                <Link to="/register">Register</Link>
                <br></br>
                {token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to="/login">Login</Link>  
                )}
                {token &&  <Link to="/account">Account</Link>}
            </div>    
        </nav>
            
        </>
    )
}