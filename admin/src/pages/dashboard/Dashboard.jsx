import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import DashboardContent from "../../components/DashboardContent/DashboardContent";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>shop.tshakya.in</h2>
        <ul>
          <Link to="/dashboard"><li className="active">Dashboard</li></Link>
          <Link to="/analytics"><li>Analytics</li></Link>
          <Link to="/products"><li>Products</li></Link>
          <Link to="others"><li>Orders</li></Link>
          <Link to="sales"><li>Sales</li></Link>
          <Link to="setting"><li>Setting</li></Link>
        </ul>
      </aside>

      <DashboardContent/>
    </div>
  );
};

export default Dashboard;
