import React from "react";
import styles from "./pricecard.module.css";

const PriceCard = () => {
  return (
    <div>
      <div className={styles.priceContainer}>
        <h1>Price Drop</h1>
        <div className={styles.priceBody}>
          <div className={styles.priceItem}>
            <strong>Product Amount:</strong>
            <p>Rs.500</p>
          </div>
          <div className={styles.priceItem}>
            <strong>Discount Amount:</strong>
            <p>Rs.100</p>
          </div>
          <div className={styles.priceItem}>
            <strong>Shipping Amount:</strong>
            <p>Rs.10</p>
          </div>
          <div className={`${styles.priceItem}`}>
            <strong>Total Amount:</strong>
            <p className={styles.finalAmount}>Rs.410</p>
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
