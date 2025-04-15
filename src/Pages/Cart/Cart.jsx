import React from "react";
import "./cart.css";
import Header from "../../Components/Layout/Header";
import CartCard from "../../Components/CartCard/CartCard";

const Cart = () => {
  return (
    <div>
      <Header />
      <div>
        <CartCard />
      </div>
    </div>
  );
};

export default Cart;
