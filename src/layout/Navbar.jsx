import { NavLink, useLocation } from "react-router";
import Button from "../components/Button/Button";
import React from "react";
import "./Navbar.css";
import { Settings, ChartArea, LogIn } from "lucide-react";
import { useAuth } from "../context/authContext";

const Navbar = React.memo(function Navbar() {
  const location = useLocation();
  const { authUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="action">
        <NavLink to="/report" state={{ backgroundLocation: location }}>
          <Button text="Report" icon={ChartArea} />
        </NavLink>
        <NavLink to="/settings" state={{ backgroundLocation: location }}>
          <Button text="Settings" icon={Settings} />
        </NavLink>
        {authUser ? (
          <Button text="Logout" onClick={() => logout()} />
        ) : (
          <NavLink to="/login">
            <Button text="Login" icon={LogIn} />
          </NavLink>
        )}
        <div className="profile"></div>
      </div>
    </nav>
  );
});

export default Navbar;
