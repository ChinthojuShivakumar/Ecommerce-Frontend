import React, { useEffect, useState } from "react";
import "./cart.css";
import Header from "../../Components/Layout/Header";
import CartCard from "../../Components/Cart/CartCard/CartCard";
import { axiosInstanceV1 } from "../../Utils/ApiServices";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [saveLaterList, setSaveLaterList] = useState([]);
  const [priceDrop, setPriceDrop] = useState({});
  const userLoggedIn = true;

  const fetchCartList = async () => {
    try {
      const payload = {
        userId: "68188ae553193aa6389b8812",
      };
      const response = await axiosInstanceV1.get(
        `/cart/list?userId=${payload.userId}`
      );
      if (response.status === 200) {
        setCartList(response.data.cartList);
        setPriceDrop(response.data.priceDrop);
        return;
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      fetchCartList();
    }
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
          <CartCard
            cartList={cartList}
            setCartList={setCartList}
            fetchCartList={fetchCartList}
            priceDrop={priceDrop}
          />
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
