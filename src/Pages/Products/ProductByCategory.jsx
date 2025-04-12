import React, { useEffect, useState } from "react";
import ProductList from "../../../updated_products.json";
import { useLocation } from "react-router-dom";
import ProductCard from "../../Components/Products/ProductCard";
import "./productlist.css";
import Header from "../../Components/Layout/Header";

const ProductByCategory = () => {
  const location = useLocation();
  const category = location.search.split("=")[1];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const findProducts = ProductList.filter((cat) => cat.category === category);

    setProducts(findProducts);
  }, []);

  return (
    <div className="category-container">
      <Header />
      <div className="category-product-list">
        {products?.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductByCategory;
