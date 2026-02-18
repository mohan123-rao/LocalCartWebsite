import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;

const LoginRes = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseURL}/restaurantlogin`,
        { email, password }
      );
      alert("Login successful!");
      localStorage.setItem("restaurantToken", res.data.token);
      localStorage.setItem("role","restaurant")
      navigate('/items')
      
    } catch (err) {
      alert(err.response.data.message);
    }
  };
    return (
        <div>
             <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto",textAlign: "center", backgroundColor: "lightblue", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.7)" }}>
      <h2>Restaurant Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />

      <button type="submit">Login</button>
      <h6>If you don't have shop account?<Link to='/resdetails'>Create Restarent Account</Link></h6>
    </form>
        </div>
    )
}

export default LoginRes
