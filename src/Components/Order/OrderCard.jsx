import React, { useEffect, useState } from "react";
import styles from "./ordercard.module.css";
import { IoMdStar } from "react-icons/io";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import { errorMessage, successMessage } from "../../Utils/Alert";

const OrderCard = () => {
  const [bookingList, setBookingList] = useState([]);

  const [links, setLinks] = useState("");

  useEffect(() => {
    fetchBookingList();
  }, []);

  const fetchBookingList = async () => {
    try {
      const response = await axiosInstanceV1.get("/booking");
      if (response.status === 200) {
        successMessage(response.data.message);
        setBookingList(response.data.bookingList);
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

  return (
    <div className={styles.cardContainer}>
      {bookingList?.map((item) => {
        return (
          <div className={styles.cardContent} key={item._id}>
            {item?.products?.map((it) => {
              return (
                <div className={styles.container} key={it?._id}>
                  <div className={styles.productData} key={it?._id}>
                    <div className={styles.cardImage}>
                      <img
                        src={it?.product?.images[0]}
                        alt={it?.product?.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/errorimage.png";
                        }}
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <h1 style={{ textTransform: "capitalize" }}>
                        {it?.product.name}
                      </h1>
                      <p className={styles.price}>
                        {" "}
                        RS.<strike>{it?.originalPrice}</strike>{" "}
                        <b>{it?.discountPrice}</b>
                        <strong>{it.discountPercent}% off</strong>
                      </p>
                    </div>
                  </div>
                  <div className={styles.orderStatusContainer}>
                    <div className={styles.orderStatus}>
                      <h1>Delivered On Mar 8</h1>
                      <p
                        style={
                          new Date(it?.product?.deliveredAt)?.getTime() <=
                          Date.now()
                            ? { color: "green" }
                            : { color: "black" }
                        }
                      >
                        your item was delivered
                      </p>
                      <p>
                        <IoMdStar size={20} />
                        Ratings & Reviews
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
