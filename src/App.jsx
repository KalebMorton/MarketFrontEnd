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

  // const handleLogin = async () => {
  //   try {
  //     const res = await fetch('/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username, password })
  //     });

  //     const data = await res.json();

  //     if (data.token) {
  //       localStorage.setItem('token', data.token);
  //       localStorage.setItem('user', JSON.stringify(data.user));
  //       navigate('/dashboard');
  //     } else {
  //       alert('Login failed');
  //     }
  //   } catch (err) {
  //     console.error('Login error:', err);
  //   }
  // };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem('token');
  //     if (!token) return;

  //     try {
  //       const res = await fetch('/auth/me', {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });

  //       const data = await res.json();
  //       console.log('Authenticated user:', data);
  //     } catch (err) {
  //       console.error('Auth check failed:', err);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <div>
      <Navigations token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login token={token} setToken={setToken} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>} />
        <Route path="/products" element={<ProductList products={products} setProducts={setProducts}/>} />
        <Route path="/products/:id" element={<ProductDetails productDetails={productDetails} setProductDetails={setProductDetails}/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )

}

export default App;

