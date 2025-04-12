import React, { useEffect, useState } from "react";
import Header from "../../Components/Layout/Header";
import ProductList from "../../../updated_products.json";
import { useLocation } from "react-router-dom";
import "./productlist.css";

const ProductDetail = () => {
  const location = useLocation();
  const productName = decodeURIComponent(location.search.split("=")[1]);
  const [product, setProduct] = useState(null);
  // console.log(product);

  useEffect(() => {
    const findProduct = ProductList.find(
      (product) => product.name === productName
    );
    // console.log(findProduct);

    setProduct(findProduct);
  }, []);
  return (
    <div>
      <Header />
      {/* <div>Page is Under Construction</div> */}
      <div>{product === null && <p>Product Not Found</p>}</div>
      <div className="pd-container">
        <div className="pd-image">
          <img
            src={product?.image}
            alt={product?.name}
            // style={{ width: "150px", height: "150px" }}
          />
          <div className="cta">
            <button className="cta-b1" type="button">Add To Cart</button>
            <button className="cta-b2" type="button">Buy Now</button>
          </div>
        </div>
        <div className="pd-body">
          <h1>{product?.name}</h1>
          <div className="pd-price">
            <p>RS.{product?.price}</p>
            <p>⭐{product?.rating}</p>
          </div>
          <p>{product?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
