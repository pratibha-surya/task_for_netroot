import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return alert("Enter OTP");

    try {
      const res = await axios.post("/api/v1/auth/verify-otp", { userId, otp }, {
        headers: { "Content-Type": "application/json" },
      });
      alert(res.data.msg);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded">
        <h2 className="text-center mb-4 text-xl font-bold">Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Verify</button>
      </form>
    </div>
  );
}

export default VerifyOtp;
