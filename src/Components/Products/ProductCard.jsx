import React from "react";
import "./product.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleRedirectDetailPage = (e, product) => {
    e.preventDefault();
    navigate(`/product?q=${product.name}`, { state: product });
    return;
  };
  return (
    <div
      className="card-container"
      onClick={(e) => handleRedirectDetailPage(e, product)}
    >
      <div className="card-image">
        <img
          src={product?.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/errorimage.png";
          }}
        />
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
