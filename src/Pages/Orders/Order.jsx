import React from "react";
// import CartCard from "../../Components/Cart/CartCard/CartCard";
import Header from "../../Components/Layout/Header";
import "./order.css";
import OrderCard from "../../Components/Order/OrderCard";
// import OrderFilters from "../../Components/Orders/OrderFilters";

const Order = () => {
  return (
    <div>
      <Header />
      {/* <OrderFilters /> */}
      <div className="order-container">
        <div className="input-container px">
          <input type="search" name="" id="" placeholder="Search your orders" className="search-input"/>
          <label htmlFor=""></label>
        </div>
        <div className="order-card">
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default Order;
