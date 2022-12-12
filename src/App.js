import Mainpage from "./components/Mainpage/mainpage";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Dashboard from "./components/Dashboard/dashboard";
import Order from "./components/Order/order";
import Address from "./components/Address/address";
import { PriceProvider } from "./contexts/priceContext";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <PriceProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Mainpage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/order" element={<Order />} />
              <Route path="/address" element={<Address />} />
            </Routes>
          </div>
        </Router>
      </PriceProvider>
    </AuthProvider>
  );
}

export default App;
