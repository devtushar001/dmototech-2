import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import DashboardContent from "./components/DashboardContent/DashboardContent";
import './App.css'
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import Products from "./pages/Add/Products";

const Dashboard = () => {
  const url = 'http://localhost:10019';
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>shop.tshakya.in</h2>
        <ul>
          <Link to="/dashboard"><li className="active">Dashboard</li></Link>
          <Link to="/analytics"><li>Analytics</li></Link>
          <Link to="/products"><li>Products</li></Link>
          <Link to="/others"><li>Orders</li></Link>
          <Link to="/sales"><li>Sales</li></Link>
          <Link to="/setting"><li>Setting</li></Link>
          <Link to="/login"><li>Login</li></Link>
        </ul>
      </aside>
      <Routes>
        <Route path="/login" element={<LoginSignup url={url} />} />
        <Route path="/dashboard" element={<DashboardContent url={url} />} />
        <Route path="/products" element={<Products url={url} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
