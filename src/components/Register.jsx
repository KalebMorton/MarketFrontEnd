import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validateMessage, setValidateMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanUsername = username.trim();
    if (cleanUsername.length === 0) {
      setValidateMessage("Username cannot be empty.");
      return;
    }
    if (password.trim().length < 6) {
      setValidateMessage("Password must be at least 6 characters long.");
      console.log(error);
      return;
    }
    setValidateMessage("");

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: cleanUsername,
          password: password.trim(),
        }),
      });

      const errData = await response.json();

      if (!response.ok) {
        setError(errData.error || "Registration failed. Please try again.");
      }
      const { token } = await response.json();
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <p>Create an account:</p>
        <br />
        <label>
          Username:{""}
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{""}
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register Account</button>
        {error && <p className="error">{error}</p>}
        {validateMessage && <p className="error">{validateMessage}</p>}
      </form>
    </div>
  );
}
