import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "/api/v1/auth/signup",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      alert(res.data.msg);
      localStorage.setItem("userId", res.data.userId); // store userId for OTP
      navigate("/verify");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent>
          <Typography variant="h5" className="text-center mb-6">Create Account</Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField fullWidth label="Name" name="name" variant="outlined" onChange={handleChange} />
            <TextField fullWidth label="Email" name="email" variant="outlined" onChange={handleChange} />
            <TextField fullWidth label="Password" name="password" type="password" variant="outlined" onChange={handleChange} />
            <Button type="submit" fullWidth variant="contained" size="large" className="!bg-green-600 hover:!bg-green-700">Signup</Button>
          </form>
          <Typography className="text-center mt-4 text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Already have an account? Log in
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
