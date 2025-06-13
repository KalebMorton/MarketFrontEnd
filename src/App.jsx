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

function App() {

  return (
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
  );
}

export default App;

