import React, { useEffect, useReducer, useState } from "react";
import style from "./dashboard.module.css";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import Header from "../../../Components/Layout/Header";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchDashboard = async () => {
    try {
      const response = await Promise.all([
        axiosInstanceV1.get("/product"),
        axiosInstanceV1.get("/user"),
        axiosInstanceV1.get("/booking"),
        axiosInstanceV1.get("/category"),
      ]);
      const [products, users, bookings, category] = response.map(
        (res) => res.data
      );

      setProducts(products.productList);
      setBookings(bookings.bookingList);
      setCategory(category.categoryList);
      setUsers(users.userList);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  const COUNT_LIST = [
    {
      name: "Total Categories",
      count: category.length,
    },
    {
      name: "Total Users",
      count: users.length,
    },
    {
      name: "Total Products",
      count: products.length,
    },
    {
      name: "Total Bookings",
      count: bookings.length,
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
            {COUNT_LIST.map((field, i) => {
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
