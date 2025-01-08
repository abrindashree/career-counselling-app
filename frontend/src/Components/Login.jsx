import React, { useState } from "react";
import "./Login.css";
import axios from 'axios'

import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleLogin = async () => {

    console.log({
      email, password
    });    
    const response = await axios.post("http://localhost:3000/signin", {
      username: username
    })      
    if (response.data){
      navigate('/', {state: {
        user: response.data.username
      }})
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" >
        <h2>Login</h2>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
