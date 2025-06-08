import React, { useState } from "react";
import styles from "./cartcard.module.css";

const CartCard = ({ cartList, setCartList }) => {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Wireless Headphones",
  //     category: "Electronics",
  //     description:
  //       "Over-ear noise-cancelling headphones with 30 hours of battery life.",
  //     price: 99.99,
  //     stock: 20,
  //     rating: 4.6,
  //     image: "https://images.pexels.com/photos/373990/pexels-photo-373990.jpeg",
  //   },
  //   {
  //     id: 2,
  //     name: "Wireless Headphones",
  //     category: "Electronics",
  //     description:
  //       "Over-ear noise-cancelling headphones with 30 hours of battery life.",
  //     price: 99.99,
  //     stock: 20,
  //     rating: 4.6,
  //     image: "https://images.pexels.com/photos/373990/pexels-photo-373990.jpeg",
  //   },
  // ];

  const handleRemove = (productId) => {
    const updatedProduct = cartList?.filter(
      (product) => product._id !== productId._id
    );
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
    setCartList(updatedProduct)
  };

  const [quantity, setQuantity] = useState(1);
  return (
    <div className={styles.cardContainer}>
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
              <div className={styles.quantity}>
                <button
                  type="button"
                  className={styles.decrease}
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <p>{quantity}</p>
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
  );
};

export default CartCard;
