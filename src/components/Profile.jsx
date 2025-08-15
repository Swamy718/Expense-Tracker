import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const verify_token = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("https://expense-tracker-backend-e1eq.onrender.com/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status !== 200) {
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    };
    verify_token();
  }, [navigate]);

  return (
    <div className="layout">
      <div className="navbar">
        <div className="menu-icon" onClick={() => setSidebarOpen(true)}>
          <Menu size={28} />
        </div>
        <h1>Expense Tracker</h1>
      </div>
      <div className="main">
        <div className={`sidebar-main ${sidebarOpen ? "show" : ""}`}>
          <Sidebar closeSidebar={() => setSidebarOpen(false)} />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
