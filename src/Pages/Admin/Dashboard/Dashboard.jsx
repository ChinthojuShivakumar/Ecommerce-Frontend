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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const COLORS = [
    "#3B82F6", // Blue (Confirmed + Pending)
    "#F59E0B", // Amber (Shipped)
    "#10B981", // Green (Delivered)
    "#F97316", // Orange (Out for Delivery)
    "#8B5CF6", // Violet (Returned)
    "#EF4444", // Red (Failed)
    "#6B7280", // Gray (Cancelled)
  ];

  const COLOR = [
    "#0EA5E9", // Sky Blue - Total Categories
    "#14B8A6", // Teal - Total Users
    "#A855F7", // Purple - Total Products
    "#FACC15", // Yellow - Total Bookings
    "#F43F5E", // Rose - Total Revenue
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

  const mergedStatusCount = {
    CONFIRMED: (statusCount["CONFIRMED"] || 0) + (statusCount["PENDING"] || 0),
    SHIPPED: statusCount["SHIPPED"] || 0,
    DELIVERED: statusCount["DELIVERED"] || 0,
    "OUT FOR DELIVERY": statusCount["OUT FOR DELIVERY"] || 0,
    RETURNED: statusCount["RETURNED"] || 0,
    FAILED: statusCount["FAILED"] || 0,
    CANCELLED: statusCount["CANCELLED"] || 0, // newly added
  };

  const bookingStatusChartData = Object.entries(mergedStatusCount).map(
    ([status, count]) => ({ status, count })
  );

  const latestBookings = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const fetchDashboard = async () => {
    try {
      const response = await Promise.all([
        axiosInstanceV1.get("/products"),
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

  const getBookingsByYear = (bookingList) => {
    const currentYear = new Date().getFullYear();
    const yearsRange = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const stats = {};

    for (const booking of bookingList) {
      const bookingYear = new Date(booking.createdAt).getFullYear();

      if (yearsRange.includes(bookingYear)) {
        stats[bookingYear] = (stats[bookingYear] || 0) + 1;
      }
    }

    // Convert to array and sort by year ascending
    return yearsRange
      .map((year) => ({
        year: year.toString(),
        count: stats[year] || 0,
      }))
      .sort((a, b) => a.year - b.year);
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
  ];

  const PRODUCT_STATUS = [
    {
      name: "Confirmed Bookings",
      count: (statusCount["CONFIRMED"] || 0) + (statusCount["PENDING"] || 0),
    },
    {
      name: "Shipped Bookings",
      count: statusCount["SHIPPED"] || 0,
    },
    {
      name: "Delivered Bookings",
      count: statusCount["DELIVERED"] || 0,
    },
    {
      name: "Cancelled Bookings",
      count: statusCount["CANCELLED"] || 0,
    },
    {
      name: "Returned Bookings",
      count: statusCount["RETURNED"] || 0,
    },
  ];

  const getStatusColor = (index) => COLORS[index % COLORS.length];
  const getBoxColor = (index) => COLOR[index % COLOR.length];

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
                <ul key={i} style={{ backgroundColor: getBoxColor(i) }}>
                  <div className={styles.cardlist}>
                    <li>{field.name}</li>
                    <li>{field.count}</li>
                  </div>
                </ul>
              );
            })}
          </div>
          <div style={{ padding: "10px 0px" }}>
            <h2>Products Status : </h2>
          </div>
          <div className={styles.card}>
            {PRODUCT_STATUS.map((field, i) => {
              return (
                <ul key={i} style={{ backgroundColor: getStatusColor(i) }}>
                  <div className={styles.cardlist}>
                    <li>{field.name}</li>
                    <li>{field.count}</li>
                  </div>
                </ul>
              );
            })}
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
          <div style={{ padding: "10px 0px" }}>
            <h2>Products Chart: </h2>
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
              <ResponsiveContainer width="100%" height={400}>
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
              <ResponsiveContainer width="100%" height={400}>
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
    </div>
  );
};

export default Dashboard;
