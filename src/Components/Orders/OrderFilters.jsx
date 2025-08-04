import React from "react";
import styles from "./orderfilter.module.css";
import BottomDrawer from "../Drawer/Drawer";

const OrderFilters = ({
  status,
  setStatus,
  year,
  setYear,
  availableYears,
  bD = false,
  setBd,
}) => {
  const ORDER_STATUS_FILTERS = [
    "On the way",
    "Delivered",
    "Cancelled",
    "Returned",
  ];
  // console.log(bD);

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
        <div className={styles.body}>
          {availableYears?.map((y, i) => {
            return (
              <div className={styles.childone} key={i}>
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
      <BottomDrawer isOpen={bD}>
        <div style={{ backgroundColor: "pink" }}>
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
                          status === item.toUpperCase()
                            ? ""
                            : item.toUpperCase()
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
            <div className={styles.body}>
              {availableYears?.map((y, i) => {
                return (
                  <div className={styles.childone} key={i}>
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
          <div style={{ textAlign: "right" }}>
            <button onClick={() => setBd(false)}>Close</button>
          </div>
        </div>
      </BottomDrawer>
    </div>
  );
};

export default OrderFilters;
