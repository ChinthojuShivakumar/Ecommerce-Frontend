import React from "react";
import "./cart.css";
import Header from "../../Components/Layout/Header";
import CartCard from "../../Components/Cart/CartCard/CartCard";
import PriceCard from "../../Components/Cart/PriceCard/PriceCard";

const Cart = () => {
  return (
    <div>
      <Header />
      <div className="cart-container">
        <CartCard />
        <PriceCard />
      </div>
    </div>
  );
};

export default Cart;
