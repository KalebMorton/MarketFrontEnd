import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({email, setEmail, password, setPassword, token, setToken}) {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate= useNavigate()
  
async function handleSubmit(e){
  e.preventDefault()
  try{
    const response = await fetch("http://localhost:3000/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    )
    const result = await response.json()
    setToken(result.token)
    localStorage.setItem("token", result.token)
    setEmail(result.email)
    localStorage.setItem("email", email)
    setSuccess("Successfully logged in! Con-quack-ulations!")
    navigate("/products")
  }catch(error){
    setError("Unable to Login. Try again!")
  }
}

  return (
    <div className='container'>
      <h2>Login to Your Account</h2>
      <h2>Please sign in below</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email: <input value={email || ""} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <br></br>
        <br></br>
        <label>
          Password: <input value={password || ""} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <br></br>
        <br></br>
        <button type = "submit">Login</button>
      </form>
    </div>
  )
}
