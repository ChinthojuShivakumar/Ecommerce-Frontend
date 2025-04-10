import React from "react";
import "./product.css";

const ProductCard = ({ product }) => {
  return (
    <div className="card-container">
      <div className="card-image">
        <img src={product.image} alt={product.name} loading="lazy"/>
      </div>
      <div className="card-body">
        <h1 className="card-product-title">{product.name}</h1>
        <div className="card-item">
          <p>RS.{product.price}</p>
          <p>⭐{product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
