import React, { useEffect, useState } from "react";
import "./cart.css";
import Header from "../../Components/Layout/Header";
import CartCard from "../../Components/Cart/CartCard/CartCard";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import { userId } from "../../Constants/Constant";
import EmptyRecords from "../../Components/EmptyRecords/EmptyRecords";

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const [saveLaterList, setSaveLaterList] = useState([]);
  const [priceDrop, setPriceDrop] = useState({});
  const userLoggedIn = true;

  const fetchCartList = async () => {
    try {
      const qP = new URLSearchParams();
      userId && qP.append("userId", userId);
      const response = await axiosInstanceV1.get(`/cart/list?${qP.toString()}`);
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
    userId && fetchCartList();
    const cartLists = JSON.parse(localStorage.getItem("cartItems")) || [];
    const saveLaterList = JSON.parse(localStorage.getItem("saveLater")) || [];
    setCartList(cartLists);
    setSaveLaterList(saveLaterList);
  }, []);
  return (
    <div>
      <Header />

      {cartList.length === 0 ? (
        <EmptyRecords Page={"Cart"} />
      ) : (
        <div className="cart-container">
          <CartCard
            cartList={cartList}
            setCartList={setCartList}
            fetchCartList={fetchCartList}
            priceDrop={priceDrop}
            user_id = {userId}
          />
          {/* <PriceCard /> */}
        </div>
      )}
      {/* {saveLaterList.length === 0 ? (
        <div className="emptyCart">
          <h1>No Cart Items Found</h1>
        </div>
      ) : (
        <div className="cart-container">
          <CartCard
            saveLaterList={saveLaterList}
            setSaveLaterList={setSaveLaterList}
          />
       
        </div>
      )} */}
    </div>
  );
};

export default Cart;
