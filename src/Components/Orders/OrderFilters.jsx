import React from "react";
import styles from "./orderfilter.module.css";

const OrderFilters = ({ status, setStatus, year, setYear, availableYears }) => {
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
                <input
                  type="checkbox"
                  name={item}
                  id={item}
                  value={item.toUpperCase()}
                  onChange={() =>
                    setStatus(
                      status === item.toUpperCase() ? "" : item.toUpperCase()
                    )
                  }
                  checked={status === item.toUpperCase()}
                />
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
          {availableYears?.map((y) => {
            return (
              <div className={styles.childone}>
                <input
                  type="checkbox"
                  name="year"
                  id="year"
                  value={y}
                  onChange={() => setYear(year === y ? "" : y)}
                  checked={year === y}
                />
                <label htmlFor={y}>{y}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
