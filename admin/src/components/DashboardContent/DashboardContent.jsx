import React from "react";
import './DashboardContent.css'

const DashboardContent = () => {
  return (
    <>
      <main className="dashboard-content">
        <header className="dashboard-header">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="notification-btn">🔔</button>
        </header>

        <section className="stats">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p>$82,650</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>1645</p>
          </div>
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p>1462</p>
          </div>
          <div className="stat-card">
            <h3>Pending Deliveries</h3>
            <p>117</p>
          </div>
        </section>

        <section className="sales-analytics">
          <h3>Sales Analytics</h3>
          <div className="chart-placeholder">[Chart]</div>
        </section>
      </main>
    </>
  )
}

export default DashboardContent;