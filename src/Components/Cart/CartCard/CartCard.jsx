import React, { useEffect, useState } from "react";
import styles from "./cartcard.module.css";
import PriceCard from "../PriceCard/PriceCard";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";
import { successMessage } from "../../../Utils/Alert";
import { fetchUserData } from "../../../Constants/Constant";

const CartCard = ({
  cartList,
  setCartList,
  saveLaterList,
  setSaveLaterList,
  fetchCartList,
  priceDrop,
}) => {
  // console.log(cartList);

  const handleRemove = async (productId) => {
    // const updatedProduct = cartList?.filter(
    //   (product) => product._id !== productId._id
    // );
    // localStorage.removeItem("cartItems");
    // localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
    // setCartList(updatedProduct);
    // return;

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

  const [prices, setPrices] = useState(null);

  // const [quantity, setQuantity] = useState(1);

  const priceFilters = () => {
    if (!Array.isArray(cartList) || cartList.length === 0) {
      setPrices({
        discount: 0,
        totalPrice: 0,
        shippingAmount: 0,
        finalAmount: 0,
      });
      return;
    }
    let discount = 0;
    let totalPrice = 0;
    const shippingAmount = 50;
    for (let item of cartList) {
      const price = item.productId.price || 0;
      const quant = item.quantity || 1;
      const discountPercent = item.productId.discount || 0;
      const itemTotal = price * quant;
      const itemDiscount = itemTotal * (discountPercent / 100);
      totalPrice += itemTotal;
      discount += itemDiscount;
    }
    const finalAmount = (totalPrice - discount + shippingAmount).toFixed(2);
    setPrices({ discount, totalPrice, shippingAmount, finalAmount });
  };

  const handleIncreaseQuantity = async (quantity, productId, cartId) => {
    // setQuantity(quantity + 1);

    // console.log(quantity +=1);
    

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
    // console.log(quantity);
    
    try {
      const payload = {
        _id: cartId,
        quantity: quantity ,
      };
      const response = await axiosInstanceV1.put("/cart/update", payload);
      if (response.status == 202) {
        fetchCartList();
      }
    } catch (error) {
      return error;
    }
    setQuantity(quantity - 1);
  };

  const handleBuyProduct = async () => {
    try {
      const payload = [];

      cartList.map((cartItem) => {
        return payload.push({
          productId: cartItem._id,
          userId: userId,
          orderId: `Order_${Date.now()}`,
          quantity: quantity,
          totalPrice: prices.finalAmount,
          paymentMode: "upi",
        });
      });

      // console.log(payload);

      const response = await axiosInstanceV1.post("/booking", payload);
      if (response.status) {
        navigate(response?.data?.paymentLink);
        successMessage(response.data.message);
        return;
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    function getUser() {
      const user = fetchUserData();
      setUserId(user._id);
    }
    getUser();
  }, [cartList]);

  useEffect(() => {
    priceFilters();
  }, []);
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cartListWrapper}>
        {cartList?.map((product, i) => {
      
          
          return (
            <div className={styles.cardContent} key={i}>
              <div className={styles.cardImage}>
                <img
                  src={product?.productId?.images[0]}
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
    </div>
  );
};

export default CartCard;
