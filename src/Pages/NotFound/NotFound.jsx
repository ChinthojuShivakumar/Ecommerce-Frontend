import React from "react";
import Header from "../../Components/Layout/Header";
import { useLocation } from "react-router-dom";
import SideMenu from "../../Components/Admin/Sidemenu/Sidemenu";

const NotFound = () => {
  const location = useLocation();
  return (
    <div style={{ fontWeight: "bold" }}>
      <Header />
      <div
        className={`${location.pathname.startsWith("/admin") && "admin"}`}
        style={{ width: "15%", display: "" }}
      >
        {location.pathname.startsWith("/admin") && <SideMenu />}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        404 | NotFound
      </div>
    </div>
  );
};

export default NotFound;
