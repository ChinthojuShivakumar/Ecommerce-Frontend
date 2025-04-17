import React, { useState } from "react";
import style from "./sidemenu.module.css";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const menuList = ["Dashboard", "Category", "Products", "Bookings"];
  const navigate = useNavigate();
  
  const handleClickMenu = (e, item) => {
    e.preventDefault();
    if (item === "Dashboard") {
      navigate("/admin");
      // setActiveMenu(item);
      return;
    }
    navigate(`/admin/${item.toLowerCase()}`);
    // setActiveMenu(item);
    return;
  };
  const getActiveMenu = () => {
    if (location.pathname === "/admin") return "Dashboard";
    const pathPart = location.pathname.split("/")[2]; // e.g., "category"
    return pathPart?.charAt(0).toUpperCase() + pathPart?.slice(1); // "Category"
  };

  const activeMenu = getActiveMenu();

  return (
    <div className={style.container}>
      <ul className={style.listitems}>
        {menuList?.map((item, i) => {
          return (
            <li
              className={`${style.listitem} ${
                activeMenu === item ? style.active : ""
              } ${style.clickable}`}
              key={i}
              onClick={(e) => handleClickMenu(e, item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideMenu;
