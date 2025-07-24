import React from "react";
import styles from "./orderfilter.module.css";

const OrderFilters = () => {
  const ORDER_STATUS_FILTERS = [
    "On the way",
    "Delivered",
    "Cancelled",
    "Returned",
  ];

  return (
    <div className={styles.filterContainer}>
      <div className={styles.title}>
        <h1>Order Filters</h1>
      </div>
      <div className={styles.statuscontainer}>
        <div className={styles.header}>
          <h3>Order Status</h3>
        </div>
        <div className={styles.body}>
          {ORDER_STATUS_FILTERS.map((item, i) => {
            return (
              <div className={styles.childone} key={i}>
                <input type="checkbox" name={item} id={item} />
                <label htmlFor={item}>{item}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.checkboxSection}>
        <div className={styles.header}>
          <h3>Order Time Filters</h3>
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" name="year" id="year" />
          <label htmlFor="">2025</label>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
