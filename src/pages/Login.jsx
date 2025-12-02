import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      
      toast.success("Login Successful "); 
      navigate("/");
    } catch (err) {
      toast.error("Invalid credentials "); 
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br/>

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /><br/>

        <button type="submit" className="Login-Signup">Login</button>
        <p onClick={()=>navigate('/forgot-password')} className="forgot-password">forget-password?</p>
        <p onClick={()=>navigate('/signup')} className="Signup-form">If u  are not signup u please Signup first!</p>
      </form>
    </div>
  );
}
