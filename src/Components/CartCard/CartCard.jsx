import React from "react";
import "./cartcard.css";

const CartCard = () => {
  const product = {
    id: "0",
    name: "Wireless Headphones",
    category: "Electronics",
    description:
      "Over-ear noise-cancelling headphones with 30 hours of battery life.",
    price: 99.99,
    stock: 20,
    rating: 4.6,
    image: "https://images.pexels.com/photos/373990/pexels-photo-373990.jpeg",
  };
  return (
    <div className="cart-container">
      <div className="card-content">
        <div className="cart-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="cart-body">
          <h1>{product.name}</h1>
          <p>RS.{product.price}</p>
        </div>
      </div>

      <div className="price-content">
        <h1>Price Drop</h1>
      </div>
    </div>
  );
};

export default CartCard;
