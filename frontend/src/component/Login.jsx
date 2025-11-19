import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) return alert("Fill all fields");

    try {
      const res = await axios.post("/api/v1/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", res.data.token);
      alert(res.data.msg);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-full max-w-md">
        <h2 className="text-center mb-4 text-xl font-bold">Login</h2>
        <input type="email" placeholder="Email" name="email" onChange={handleChange} className="border p-2 w-full mb-4" />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} className="border p-2 w-full mb-4" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
