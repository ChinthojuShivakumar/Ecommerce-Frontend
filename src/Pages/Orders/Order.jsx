import React from "react";
// import CartCard from "../../Components/Cart/CartCard/CartCard";
import Header from "../../Components/Layout/Header";
import styles from "./order.module.css";
import OrderCard from "../../Components/Order/OrderCard";
import OrderFilters from "../../Components/Orders/OrderFilters";
import Search from "../../Components/Search/Search";

const Order = () => {
  return (
    <div>
      <Header />
      <div className={styles.order}>
        <div className={styles.filters}>
          <OrderFilters />
        </div>
        <div className={styles.orderContainer}>
          {/* <div className={`${styles.inputContainer} ${styles.px}`}>
            <input
              type="search"
              name=""
              id=""
              placeholder="Search your orders"
              className={styles.searchInput}
            />
            <label htmlFor=""></label>
          </div> */}
          <Search />
          <div className={styles.orderCard}>
            <OrderCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
