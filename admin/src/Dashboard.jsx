import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import DashboardContent from "./components/DashboardContent/DashboardContent";
import './App.css'
import LoginSignup from "./pages/LoginSignup/LoginSignup";
import Products from "./pages/Products/Products";
import AllProducts from './pages/AllProducts/AllProducts'
import Categories from "./pages/Categories/Categories";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";

const Dashboard = () => {
  const url = 'http://localhost:10019';
  const token = localStorage.getItem("token");

  const [active, setActive] = useState("dashboard");

  const handleActive = (string) => {
    setActive(string);
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>shop.tshakya.in</h2>
        <ul>
          <Link to="/"><li onClick={() => handleActive("home")} className={active === "home" ? "active" : ""}>Home</li></Link>
          <Link to="/dashboard"><li onClick={() => handleActive("dashboard")} className={active === "dashboard" ? "active" : ""}>Dashboard</li></Link>
          <Link to="/all-products"><li onClick={() => handleActive("all-products")} className={active === "all-products" ? "active" : ""}>All Products</li></Link>
          <Link to="/products"><li onClick={() => handleActive("products")} className={active === "products" ? "active" : ""}>Add Products</li></Link>
          <Link to="/category"><li onClick={() => handleActive("categories")} className={active === "categories" ? "active" : ""}>Categories</li></Link>
          <Link to="/sales"><li onClick={() => handleActive("sales")} className={active === "sales" ? "active" : ""}>Sales</li></Link>
          <Link to="/setting"><li onClick={() => handleActive("setting")} className={active === "setting" ? "active" : ""}>Setting</li></Link>
          <Link to="/login"><li onClick={() => handleActive("login")} className={active === "login" ? "active" : ""}>Login</li></Link>
          <Link to="/orders"><li onClick={() => handleActive("orders")} className={active === "orders" ? "orders" : ""}>Orders</li></Link>
        </ul>
      </aside>
      <div className="conflict-setup"></div>
      <Routes>
        <Route path="/" element={<Home url={url} token={token}/>} />
        <Route path="/login" element={<LoginSignup url={url} token={token} />} />
        <Route path="/dashboard" element={<DashboardContent url={url} token={token} />} />
        <Route path="/products" element={<Products url={url} token={token} />} />
        <Route path="/all-products" element={<AllProducts url={url} token={token} />} />
        <Route path="/category" element={<Categories url={url} token={token} />} />
        <Route path="/orders" element={<Orders url={url} token={token} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
