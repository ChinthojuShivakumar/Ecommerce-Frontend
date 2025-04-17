import React from "react";
import style from "./dashboard.module.css";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import Header from "../../../Components/Layout/Header";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.sidemenu}>
          <SideMenu />
        </div>
        <div className={style.body}>
          <h1>Dash board home</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
