import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './App.css';
import Navigations from './components/Navigations';
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'
import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'
import Home from './components/Home'
import {Routes, Route} from 'react-router-dom'


function App() {
  const [products, setProducts] = useState([])
  const [productDetails, setProductDetails] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(token) {
      localStorage.setItem("token", token)
    }else{
      localStorage.removeItem("token")
    }
  }, [token])
  
    useEffect(() => {
      if(username) {
        localStorage.setItem("username", JSON.stringify(username))
      }else{
        localStorage.removeItem("username")
      }
    }, [username]);
    
  useEffect(() => {
    const storedReserved = localStorage.getItem("reserved")
    if(storedReserved){
      setReserved(JSON.stringify(storedReserved))
    }else{
      localStorage.removeItem("reserved")
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, []);

  return (
    <div>
      <Navigations token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={token ? <Account token={token}/> : <p>Loading token...</p>} />
        <Route path="/login" element={<Login token={token} setToken={setToken} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>} />
        <Route path="/products" element={<ProductList products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id" element={<ProductDetails productDetails={productDetails} setProductDetails={setProductDetails}/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )

}

export default App;

