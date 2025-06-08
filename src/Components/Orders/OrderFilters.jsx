import React from "react";
import styles from "./orderfilter.module.css";

const OrderFilters = () => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.title}>
        <h1>Order Filters</h1>
      </div>
      <div className={styles.checkboxSection}>
        <div className={styles.checkbox}>
          <input type="checkbox" name="year" id="year" />
          <label htmlFor="">2025</label>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
