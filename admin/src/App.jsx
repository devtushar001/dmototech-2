import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes, Link } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Panel from "./pages/Panel/Panel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewAdd from "./pages/NewAdd/NewAdd";
import LoginSignup from "./pages/LoginSignup/LoginSignup";

function App() {

  const url = 'http://localhost:10019';

  return (
    <>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Panel url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/new-add" element={<NewAdd url={url} />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  )
}

export default App;