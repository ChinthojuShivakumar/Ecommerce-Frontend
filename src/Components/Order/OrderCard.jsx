import React from "react";
import styles from "./ordercard.module.css";
import { IoMdStar } from "react-icons/io";

const OrderCard = () => {
  const product = {
    id: "0",
    name: "Wireless Headphones",
    category: "Electronics",
    description:
      "Over-ear noise-cancelling headphones with 30 hours of battery life.",
    price: 99.99,
    stock: 20,
    rating: 4.6,
    image: "https://images.pexels.com/photos/373990/pexels-photo-373990.jpeg",
  };
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.productData}>
          <div className={styles.cardImage}>
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/errorimage.png";
              }}
            />
          </div>
          <div className={styles.cardBody}>
            <h1>{product.name}</h1>
            <p>RS.{product.price}</p>
          </div>
        </div>
        <div className={styles.orderStatusContainer}>
          <div className={styles.orderStatus}>
            <h1>Delivered On Mar 8</h1>
            <p>your item was delivered</p>
            <p>
              <IoMdStar size={20} />
              Ratings & Reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
