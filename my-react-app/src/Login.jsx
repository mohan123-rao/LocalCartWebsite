import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { recognition,speak } from "./Voiceassistant.jsx";
import { useEffect } from "react";
const baseURL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate();
  

  useEffect(() => {
    if(!localStorage.getItem("userToken")) {
      speak("Meru inka account create cheyyaledhu.first account create cheyandi. lekapothe login cheyaleru. account create cheyali ante sign up meeda click cheyandi. login cheyali ante email and password enter chesi login meeda click cheyandi.");
    }
    speak("Welcome to Local Cart Login Page.login cheyali ante email and password enter chesi login meeda click cheyandi.");
    
  }, []);

  const FormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post(
        `${baseURL}/login`,
        { email, password }
      );

      //  store only the token
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("role","customer")
      console.log(res.data.token)
      setLoading(false)
      alert("Login successful!");
      navigate("/");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="out-login">
      <div className="login" style={{ maxWidth: "400px", margin: "auto",textAlign: "center", backgroundColor: "lightblue", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.7)" }}>
        <h1>Login</h1>

        <form onSubmit={FormSubmit}>
          Email:<br />
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br /><br />

          Password:<br />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br /><br />
          {!loading ? (
      <button type="submit">Login</button>
          ):(
      <button>Loading...</button>
          )}
          <br /><br />

          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login
