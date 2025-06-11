import React, { useEffect, useState } from "react";
import styles from "./cartcard.module.css";
import PriceCard from "../PriceCard/PriceCard";

const CartCard = ({ cartList, setCartList }) => {
  const handleRemove = (productId) => {
    const updatedProduct = cartList?.filter(
      (product) => product._id !== productId._id
    );
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
    setCartList(updatedProduct);
  };

  const [prices, setPrices] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const priceFilters = () => {
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
                  <h5>Save For Later</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <PriceCard price={prices} />
      </div>
    </div>
  );
};

export default CartCard;
