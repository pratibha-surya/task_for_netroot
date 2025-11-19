import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./component/Signup";
import Login from "./component/Login";
import ProtectedRoute from "./component/ProtectedRoute";
import Profile from "../page/Profile";
import VerifyOtp from "../page/verify";
   


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyOtp />} />   

        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
