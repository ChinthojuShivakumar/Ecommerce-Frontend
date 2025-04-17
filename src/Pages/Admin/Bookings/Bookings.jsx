import React from "react";
import style from "./booking.module.css";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import BookingList from "../../../../booking.json";
const Bookings = () => {
  const productStatus = {
    pending: "pending",
    confirmed: "confirmed",
    delivered: "delivered",
    shipping: "shipping",
  };
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.sidemenu}>
          <SideMenu />
        </div>
        <div className={style.body}>
          {/* <div>
            <h1>Booking Listing Page</h1>
          </div> */}
          <div className={style.tableContainer}>
            <div className={style.listCount}>
              <h3>Total Booking List</h3>
              <p>
                Showing <strong>6</strong> of{" "}
                <strong>{BookingList.length}</strong> bookings
              </p>
            </div>
            <table className={style.table}>
              <thead className={style.tablehead}>
                <tr className={style.tablerow}>
                  {BookingList?.[0] &&
                    Object.keys(BookingList[0]).map((key, index) => (
                      <th className={style.th} key={index}>
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className={style.body}>
                {BookingList.map((product) => {
                  return (
                    <tr key={product.bookingId} className={style.tablerow}>
                      <td className={style.td}>{product.bookingId}</td>
                      <td className={style.td}>{product.productId}</td>
                      <td className={style.td}>{product.productName}</td>
                      <td className={style.td}>{product.userId}</td>
                      <td className={style.td}>{product.quantity}</td>
                      <td className={style.td}>Rs.{product.totalPrice}</td>
                      <td className={style.td}>
                        {product.bookingDate.split("T")[0]}
                      </td>
                      <td
                        className={` ${style.td} ${
                          style[product.status.toLowerCase()]
                        }`}
                      >
                        {product.status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
