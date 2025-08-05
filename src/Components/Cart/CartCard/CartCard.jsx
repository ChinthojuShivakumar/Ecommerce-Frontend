import React, { useEffect, useState } from "react";
import styles from "./cartcard.module.css";
import PriceCard from "../PriceCard/PriceCard";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";
import { errorMessage, successMessage } from "../../../Utils/Alert";
import { fetchUserData, modalStyle } from "../../../Constants/Constant";
import Modal from "../../Modal/Modal";
import { GiCash, GiWallet } from "react-icons/gi";
import { FaAmazonPay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartCard = ({
  cartList,
  setCartList,
  saveLaterList,
  setSaveLaterList,
  fetchCartList,
  priceDrop,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const PAYMENT_MODES = [
    { mode: "card", icon: <GiWallet size={26} /> },
    { mode: "upi", icon: <FaAmazonPay size={26} /> },
    { mode: "cod", icon: <GiCash size={26} /> },
  ];
  const [paymentMode, setPaymentMode] = useState("");
  const handleRemove = async (productId) => {
    try {
      const response = await axiosInstanceV1.delete(`/cart/${productId._id}`);
      if (response.status === 202) {
        successMessage(response.data.message);
        fetchCartList();
        return;
      }
    } catch (error) {
      return error;
    }
  };

  const [userId, setUserId] = useState(null);

  const handleSaveLater = (product) => {
    const fetchSaveLaterList =
      JSON.parse(localStorage.getItem("saveLater")) || [];
    const isProductExits = fetchSaveLaterList.find(
      (productId) => productId._id === product._id
    );
    if (isProductExits) {
      alert("Chosen Product is already in List...!!!");
      navigate("/cart");
      return;
    }
    fetchSaveLaterList.push(product);
    localStorage.setItem("saveLater", JSON.stringify(fetchSaveLaterList));
    // removing product from cart List
    const updatedProduct = cartList?.filter(
      (productId) => productId._id !== product._id
    );
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
    setCartList(updatedProduct);
  };

  const handleIncreaseQuantity = async (quantity, productId, cartId) => {
    try {
      const payload = {
        _id: cartId,
        quantity: quantity,
      };
      const response = await axiosInstanceV1.put("/cart/update", payload);
      if (response.status == 202) {
        fetchCartList();
      }
    } catch (error) {
      return error;
    }
  };
  const handleDecreaseQuantity = async (quantity, productId, cartId) => {
    try {
      const payload = {
        _id: cartId,
        quantity: quantity,
      };
      const response = await axiosInstanceV1.put("/cart/update", payload);
      if (response.status == 202) {
        fetchCartList();
      }
    } catch (error) {
      return error;
    }
    // setQuantity(quantity - 1);
  };
  const payNow = async () => {
    try {
      if (!paymentMode) {
        errorMessage("Please select payment mode..!");
        return;
      }
      const payload = { addressId: "686f812ae38f061714755531" };
      const orderId = `Order_${Date.now()}`;

      let originalPriceTotal = 0;
      if (userId) payload.userId = userId;
      if (orderId) payload.orderId = orderId;
      if (priceDrop.finalPrice) payload.finalPrice = priceDrop.finalPrice;
      if (priceDrop?.finalPrice)
        payload.finalPrice = parseFloat(priceDrop.finalPrice);
      if (priceDrop?.shippingPrice)
        payload.shippingPrice = parseFloat(priceDrop.shippingPrice);
      if (priceDrop?.discountPercent)
        payload.discountPercent = parseFloat(priceDrop.discountPercent);
      if (priceDrop?.discountAmount)
        payload.discountAmount = parseFloat(priceDrop.discountAmount);

      if (cartList.length > 0)
        payload.products = cartList.map((item) => {
          const originalPrice = parseFloat(item.productId.originalPrice);
          const quantity = item.quantity;

          originalPriceTotal += originalPrice * quantity;
          return {
            product: item.productId._id,
            quantity: item.quantity,
            originalPrice: parseFloat(item.productId.originalPrice),
            discountPrice: parseFloat(item.productId.discountedPrice),
            discountPercent: parseFloat(item.productId.discountPercent),
          };
        });

      if (originalPriceTotal) payload.totalPrice = originalPriceTotal;
      if (paymentMode) payload.paymentMode = paymentMode;

      const response = await axiosInstanceV1.post("/booking", payload);
      if (response.status === 201) {
        if (paymentMode !== "cod") {
          window.location.href = response?.data?.paymentLink;
        } else {
          setOpen(false);
          setTimeout(() => navigate("/orders"), 100);
        }
        successMessage(response.data.message);
        return;
      }
    } catch (error) {
      return error;
    }
  };
  const handleBuyProduct = async () => {
    setOpen(true);
  };

  useEffect(() => {
    function getUser() {
      const user = fetchUserData();
      setUserId(user._id);
    }
    getUser();
  }, [cartList]);

  // useEffect(() => {
  //   priceFilters();
  // }, []);
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cartListWrapper}>
        {cartList?.map((product, i) => {
          return (
            <div className={styles.cardContent} key={i}>
              <div className={styles.cardImage}>
                <img
                  src={product?.productId?.images[0]?.url}
                  alt={product?.productId?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/errorimage.png";
                  }}
                />
              </div>
              <div className={styles.cardBody}>
                <h1>{product.productId?.name}</h1>
                <p className={styles.price}>
                  RS.<strike>{product.productId.price}</strike>{" "}
                  <b>
                    {(
                      product.productId.price * product.quantity -
                      (product.productId.price *
                        product.quantity *
                        product.productId.discount) /
                        100
                    ).toFixed(2)}
                  </b>
                  <strong>{product.productId.discount}% off</strong>
                </p>
                <div className={styles.quantityContainer}>
                  <button
                    type="button"
                    className={styles.decrease}
                    onClick={() =>
                      handleDecreaseQuantity(
                        product.quantity - 1,
                        product.productId._id,
                        product._id
                      )
                    }
                    disabled={product.quantity === 1}
                  >
                    -
                  </button>
                  <p className={styles.quantity}>{product.quantity || 1}</p>
                  <button
                    type="button"
                    className={styles.increase}
                    onClick={() =>
                      handleIncreaseQuantity(
                        product.quantity + 1,
                        product.productId._id,
                        product._id
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className={styles.action}>
                  <h5 onClick={() => handleRemove(product)}>Remove</h5>
                  <h5 onClick={() => handleSaveLater(product)}>
                    Save For Later
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {cartList?.length > 0 && (
        <div>
          <PriceCard price={priceDrop} handleBuyProduct={handleBuyProduct} />
        </div>
      )}
      <Modal style={modalStyle} open={open}>
        <div className={styles.header}>
          <h2>Please Select The Payment Mode to create booking</h2>
          <div className={styles.body}>
            {PAYMENT_MODES.map((mode, i) => {
              return (
                <div className={styles.subbody} key={i}>
                  <input
                    type="radio"
                    name="mode"
                    id="mode"
                    value={mode.mode}
                    checked={paymentMode === mode.mode}
                    className={styles.mode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />
                  <label htmlFor={mode} className={styles.modeName}>
                    <span className={styles.icon}>{mode.icon}</span> {mode.mode}
                  </label>
                </div>
              );
            })}
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.payNow} onClick={payNow}>
              Pay Now
            </button>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => setOpen(false)}
            >
              Cancel Payment
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CartCard;
