import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({username, setUsername, password, setPassword, token, setToken}) {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate= useNavigate()
  
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })
  
      if (response.ok) {
        const result = await response.json();
        setToken(result.token)
        localStorage.setItem("token", result.token)
        setUsername(username)
        localStorage.setItem("username", username)
        setSuccess("Successfully logged in! Con-quack-ulations!")
        navigate("/products");
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Login Failed")
      }
    } catch (error) {
      setError("Unable to Login. Try again!")
    }
  }

  return (
    <div className='login-container'>
      <h2>Please sign in below</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input value={username || ""} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <br></br>
        <br></br>
        <label>
          Password: <input type='password' value={password || ""} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <br></br>
        <br></br>
        <button type = "submit">Login</button>
      </form>
    </div>
  )
}
