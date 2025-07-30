import React, { useEffect, useReducer, useState } from "react";
import styles from "./dashboard.module.css";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import Header from "../../../Components/Layout/Header";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MONTH_NAMES } from "../../../Constants/Constant";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [category, setCategory] = useState([]);
  const [bookingsByMonth, setBookingsByMonth] = useState([]);
  const [bookingsByYear, setBookingsByYear] = useState([]);

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#00C49F",
    "#FF4444",
    "#B07DFF",
  ];

  const statusCount = bookings?.reduce((acc, booking) => {
    booking.products.forEach((item) => {
      const status = item.status || "PENDING";
      acc[status] = (acc[status] || 0) + 1;
    });
    return acc;
  }, {});

  const totalRevenue = bookings?.reduce(
    (sum, bookings) => sum + (bookings.finalPrice || 0),
    0
  );

  const bookingStatusChartData = Object.entries(statusCount).map(
    ([status, count]) => ({ status, count })
  );
  const latestBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

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
      const monthlyStats = getBookingsByMonth(bookings.bookingList);
      setBookingsByMonth(monthlyStats);
      setBookingsByYear(getBookingsByYear(bookings.bookingList));
    } catch (error) {
      return error;
    }
  };

  const getBookingsByMonth = (bookings) => {
    const monthlyData = {};

    bookings.forEach((booking) => {
      const date = new Date(booking.createdAt);
      const month = MONTH_NAMES[date.getMonth()]; // Get month string

      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }

      monthlyData[month]++;
    });

    // Convert to array for chart
    const bookingsByMonth = MONTH_NAMES.map((month) => ({
      month,
      count: monthlyData[month] || 0,
    }));

    return bookingsByMonth;
  };

  const getBookingsByYear = (bookings) => {
    const yearlyData = {};

    bookings.forEach((booking) => {
      const year = new Date(booking.createdAt).getFullYear();

      if (!yearlyData[year]) {
        yearlyData[year] = 0;
      }

      yearlyData[year]++;
    });

    // Convert to array for chart
    const bookingsByYear = Object.keys(yearlyData).map((year) => ({
      year,
      count: yearlyData[year],
    }));

    return bookingsByYear;
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
    {
      name: "Total Revenue",
      count: totalRevenue.toFixed(2),
    },
    {
      name: "Cancelled Bookings",
      count: statusCount["CANCELLED"] || 0,
    },
    {
      name: "Confirmed Bookings",
      count: statusCount["CONFIRMED"] || 0,
    },
    {
      name: "Delivered Bookings",
      count: statusCount["DELIVERED"] || 0,
    },
    {
      name: "Returned Bookings",
      count: statusCount["RETURNED"] || 0,
    },
  ];

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.sidemenu}>
          <SideMenu />
        </div>
        <div className={styles.body}>
          <div className={styles.card}>
            {COUNT_LIST.map((field, i) => {
              return (
                <ul key={i}>
                  <div className={styles.cardlist}>
                    <li>{field.name}</li>
                    <li>{field.count}</li>
                  </div>
                </ul>
              );
            })}
          </div>
          <div className={styles.charts}>
            <div className={styles.chart}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={bookingsByMonth}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.chart}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={bookingStatusChartData}
                    dataKey="count"
                    nameKey="status"
                    outerRadius={100}
                    label
                  >
                    {bookingStatusChartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.chart}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingsByYear}>
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Latest Bookings</h2>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Order ID</th>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Total Products</th>
              <th className={styles.th}>Final Price</th>
              <th className={styles.th}>Created</th>
            </tr>
          </thead>
          <tbody>
            {latestBookings.map((b, i) => (
              <tr key={i} className={styles.tr}>
                <td className={styles.td}>{b.orderId}</td>
                <td className={styles.td}>{b.userId?.name || "User"}</td>
                <td className={styles.td}>
                  {b.products.reduce((sum, p) => sum + p.quantity, 0)}
                </td>
                <td className={styles.td}>₹{b.finalPrice}</td>
                <td className={styles.td}>
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
