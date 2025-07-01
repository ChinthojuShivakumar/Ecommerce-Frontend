import React, { useEffect, useState } from "react";
import styles from "./cartcard.module.css";
import PriceCard from "../PriceCard/PriceCard";

const CartCard = ({
  cartList,
  setCartList,
  saveLaterList,
  setSaveLaterList,
}) => {
  const handleRemove = (productId) => {
    const updatedProduct = cartList?.filter(
      (product) => product._id !== productId._id
    );
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
    setCartList(updatedProduct);
    return;
  };

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

  const [quantity, setQuantity] = useState(1);

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
    let shippingAmount = 100;

    for (let item of cartList) {
      totalPrice += item.price || 0;
      discount += item.discount || 0;
    }
    const finalAmount = totalPrice - discount + shippingAmount;

    setPrices({ discount, totalPrice, shippingAmount, finalAmount });
  };

  // useEffect(() => {
  //   useEffect(() => {
  //     const cartLists = JSON.parse(localStorage.getItem("cartItems"));

  //   }, []);
  // }, []);

  useEffect(() => {
    priceFilters();
  }, [cartList]);
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cartListWrapper}>
        {cartList?.map((product, i) => {
          return (
            <div className={styles.cardContent} key={i}>
              <div className={styles.cardImage}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/errorimage.png";
                  }}
                />
              </div>
              <div className={styles.cardBody}>
                <h1>{product.name}</h1>
                <p>RS.{product.price}</p>
                <div className={styles.quantityContainer}>
                  <button
                    type="button"
                    className={styles.decrease}
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <p className={styles.quantity}>{quantity}</p>
                  <button
                    type="button"
                    className={styles.increase}
                    onClick={() => setQuantity(quantity + 1)}
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
          <PriceCard price={prices} />
        </div>
      )}
    </div>
  );
};

export default CartCard;
