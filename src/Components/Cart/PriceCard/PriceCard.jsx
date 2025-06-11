import React from "react";
import styles from "./pricecard.module.css";

const PriceCard = ({ price }) => {
  console.log(price);

  return (
    <div>
      <div className={styles.priceContainer}>
        <h1>Price Drop</h1>
        <div className={styles.priceBody}>
          <div className={styles.priceItem}>
            <strong>Items:</strong>
            <p>Rs.{price?.totalPrice}</p>
          </div>
          <div className={styles.priceItem}>
            <strong>Discount Amount:</strong>
            <p>Rs.{price?.discount}</p>
          </div>
          <div className={styles.priceItem}>
            <strong>Shipping Amount:</strong>
            <p>Rs.{price?.shippingAmount}</p>
          </div>
          <div className={`${styles.priceItem}`}>
            <strong>Total Amount:</strong>
            <p className={styles?.finalAmount}>Rs.{price?.finalAmount}</p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.buy}>
            Click here to Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
