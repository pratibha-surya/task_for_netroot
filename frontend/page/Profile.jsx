import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); 
      return;
    }

    axios
      .get("/api/v1/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error(err.response?.data || err.message);
        localStorage.removeItem("token"); 
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
     
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white p-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
