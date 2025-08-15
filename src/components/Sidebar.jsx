import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import profile from "../assets/profile.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function Sidebar({ closeSidebar }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get("https://expense-tracker-backend-w8hm.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setUsername(response.data["username"]);
        } else {
          console.log("Error while fetching user data");
        }
      } catch (error) {
        console.log("Error while fetching user data");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate("/home");
  }
  return (
    <div className="sidebar open">
      <div className="close-btn" onClick={closeSidebar}>
        <X size={24} />
      </div>
      <div className="profile">
        <img src={profile} alt="Profile" />
        <h3>{username}</h3>
      </div>
      <ul>
        <li>
          <NavLink to="/profile/dashboard" onClick={closeSidebar} className={({ isActive }) => isActive ? "active-link" : ""}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/income" onClick={closeSidebar} className={({ isActive }) => isActive ? "active-link" : ""}>
            Income
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/expenses" onClick={closeSidebar} className={({ isActive }) => isActive ? "active-link" : ""}>
            Expenses
          </NavLink>
        </li>
      </ul>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
