import React from "react";
import style from "./dashboard.module.css";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import Header from "../../../Components/Layout/Header";

const Dashboard = () => {
  const COUNT_LIST = [
    {
      name: "Total Categories",
      count: 10,
    },
    {
      name: "Total Users",
      count: 10,
    },
    {
      name: "Total Products",
      count: 10,
    },
    {
      name: "Total Bookings",
      count: 10,
    },
  ];
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.sidemenu}>
          <SideMenu />
        </div>
        <div className={style.body}>
          <h1>Dash board home</h1>
          <div className={style.card}>
            {COUNT_LIST.map((field,i) => {
              return (
                <ul key={i}>
                  <div className={style.cardlist}>
                    <li>{field.name}</li>
                    <li>{field.count}</li>
                  </div>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
