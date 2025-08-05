import React, { useEffect, useState } from "react";
import styles from "./ordercard.module.css";
import { IoMdStar } from "react-icons/io";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import { successMessage } from "../../Utils/Alert";
import { userId } from "../../Constants/Constant";
import EmptyRecords from "../EmptyRecords/EmptyRecords";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ status, year, setAvailableYear }) => {
  const [bookingList, setBookingList] = useState([]);

  const navigate = useNavigate();
  const [links, setLinks] = useState("");
  const qP = new URLSearchParams();

  useEffect(() => {
    fetchBookingList();
  }, [status, year]);

  const fetchBookingList = async () => {
    status &&
      qP.append("status", status === "ON THE WAY" ? "CONFIRMED" : status);
    year && qP.append("year", year);
    userId && qP.append("userId", userId);
    try {
      const response = await axiosInstanceV1.get(`/booking?${qP.toString()}`);
      if (response.status === 200) {
        const extractYears = response.data.bookingList.map((year) =>
          new Date(year.createdAt).getFullYear()
        );
        const minYear = Math.min(...extractYears);
        const currentYear = new Date().getFullYear();
        const allYears = [];
        for (let y = minYear; y <= currentYear; y++) {
          allYears.push(y.toString());
        }
        // console.log(extractYears, "ExtractedYears");
        // console.log(minYear, "minYear");
        // console.log(allYears, "all years");

        // successMessage(response.data.message);
        setBookingList(response.data.bookingList);
        setAvailableYear(allYears);
      }
    } catch (error) {
      return error;
    }
  };

  const verifyPayment = async (link) => {
    // if (link) {
    //   errorMessage("OrderId Required..!");
    //   return;
    // }
    try {
      const response = await axiosInstanceV1.post("/verify-payment", {
        orderId: link,
      });
      if (response.status == 200) {
        fetchBookingList();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const today = new Date(Date.now()).toISOString().slice(0, 10);
    const todaysBooking = bookingList.filter(
      (booking) =>
        booking.paymentMode !== "cod" &&
        booking.createdAt.split("T")[0] === today &&
        booking.products.some(
          (item) => item.status === "PENDING" || item.status === "PAID"
        )
    );
    const bookingItem = todaysBooking?.map((item) => item.orderId);
    // console.log(bookingItem);
    setLinks(bookingItem[0]);
    bookingItem[0] && verifyPayment(bookingItem[0]);
  }, [bookingList]);

  useEffect(() => {
    links && verifyPayment(links);
  }, [links]);

  const handleNavigateDetailPage = (booking, productId) => {
    const qP = new URLSearchParams();
    qP.append("linkId", booking.orderId);
    qP.append("userId", booking.userId._id);
    qP.append("orderId", productId);
    navigate(`/order?${qP.toString()}`, { state: booking });
    return;
  };

  return (
    <div className={styles.cardContainer}>
      {!bookingList.length && <EmptyRecords Page={"Booking"} />}
      {bookingList?.map((item) =>
        item?.products?.map((it) => (
          <div className={styles.cardContent} key={it?._id}>
            <div
              className={styles.container}
              onClick={() => handleNavigateDetailPage(item, it?._id)}
            >
              <div className={styles.productData}>
                <div className={styles.cardImage}>
                  <img
                    src={it?.product?.images[0]?.url}
                    alt={it?.product?.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/errorimage.png";
                    }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h1 style={{ textTransform: "capitalize" }}>
                    {it?.product?.name}
                  </h1>
                  <p className={styles.price}>
                    RS.<strike>{it?.originalPrice}</strike>{" "}
                    <b>{it?.discountPrice}</b>{" "}
                    <strong>{it?.discountPercent}% off</strong>
                  </p>
                </div>
              </div>

              <div className={styles.orderStatusContainer}>
                <div className={styles.orderStatus}>
                  <h1
                    className={`${styles.td} ${
                      styles[it?.status?.toLowerCase()] || ""
                    }`}
                  >
                    {it.status.charAt(0).toUpperCase() +
                      it.status.slice(1).toLowerCase()}{" "}
                    On{" "}
                    {it.status === "DELIVERED"
                      ? it.deliveredAt.split("T")[0]
                      : it.status === "SHIPPED"
                      ? it.shippedAt.split("T")[0]
                      : it.status === "RETURNED"
                      ? it.returnedAt.split("T")[0]
                      : item.createdAt?.split("T")[0]}
                  </h1>
                  <p
                    style={
                      new Date(it?.product?.deliveredAt)?.getTime() <=
                      Date.now()
                        ? { color: "green" }
                        : { color: "black" }
                    }
                  >
                    your item was {it?.status.toLowerCase()}
                  </p>
                  <p>
                    <IoMdStar size={20} />
                    Ratings & Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderCard;
