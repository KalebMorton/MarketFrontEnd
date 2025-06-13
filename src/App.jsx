<<<<<<< HEAD
import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Navigations from './components/Navigations'
import Home from './components/Home'
import Account from './components/Account'
import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'
import Login from './components/Login'
import Register from './components/Register'
=======
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './App.css';
import Navigations from './components/Navigations';
import Dashboard from './components/Dashboard';
>>>>>>> 0fcc926a8013361f28a01ce00616e44a288608cb

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Enables navigation after login

  const handleLogin = async () => {
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        console.log('Authenticated user:', data);
      } catch (err) {
        console.error('Auth check failed:', err);
      }
    };

    fetchUser();
  }, []);

  return (
<<<<<<< HEAD
    <div>
      <Navigations token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
=======
    <>
      <h1>Frontend</h1>
      <Navigations />

      <div style={{ marginTop: '1rem' }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
>>>>>>> 0fcc926a8013361f28a01ce00616e44a288608cb
  );
}

export default App;
<<<<<<< HEAD

=======
>>>>>>> 0fcc926a8013361f28a01ce00616e44a288608cb
