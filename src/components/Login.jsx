import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({email, setEmail, password, setPassword, token, setToken}) {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate= useNavigate()
  
  return (
    <div className='container'>
      <h2>Login</h2>
      <p>Please sign in below</p>
    </div>
  );
}
