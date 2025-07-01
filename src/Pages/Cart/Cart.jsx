import React, { useEffect, useState } from "react";
import "./cart.css";
import Header from "../../Components/Layout/Header";
import CartCard from "../../Components/Cart/CartCard/CartCard";
import PriceCard from "../../Components/Cart/PriceCard/PriceCard";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [saveLaterList, setSaveLaterList] = useState([]);

  useEffect(() => {
    const cartLists = JSON.parse(localStorage.getItem("cartItems")) || [];
    const saveLaterList = JSON.parse(localStorage.getItem("saveLater")) || [];
    setCartList(cartLists);
    setSaveLaterList(saveLaterList);
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
      {saveLaterList.length === 0 ? (
        <div className="emptyCart">
          <h1>No Cart Items Found</h1>
        </div>
      ) : (
        <div className="cart-container">
          <CartCard
            saveLaterList={saveLaterList}
            setSaveLaterList={setSaveLaterList}
          />
          {/* <PriceCard /> */}
        </div>
      )}
    </div>
  );
};

export default Cart;
