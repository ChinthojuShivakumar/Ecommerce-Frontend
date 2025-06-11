import React, { useEffect, useState } from "react";
import "./cart.css";
import Header from "../../Components/Layout/Header";
import CartCard from "../../Components/Cart/CartCard/CartCard";
import PriceCard from "../../Components/Cart/PriceCard/PriceCard";

const Cart = () => {
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    const cartLists = JSON.parse(localStorage.getItem("cartItems"));
    setCartList(cartLists);
  }, []);
  return (
    <div>
      <Header />

      {cartList.length === 0 ? (
        <div className="emptyCart">
          <h1>No Cart Items Found</h1>
        </div>
      ) : (
        <div className="cart-container">
          <CartCard cartList={cartList} setCartList={setCartList} />
          {/* <PriceCard /> */}
        </div>
      )}
    </div>
  );
};

export default Cart;
