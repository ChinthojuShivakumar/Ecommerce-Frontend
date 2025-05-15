import React, { Suspense, useEffect, useState } from "react";
// import productsList from "../../../updated_products.json";
// import categoryList from "../../../updated_categories.json";

// import ProductCard from "./ProductCard";
const ProductCard = React.lazy(() => import("./ProductCard"));

import "./product.css";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
const Products = () => {
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    try {
      const response = await axiosInstanceV1.get("/product");
      if (response.status === 200) {
        setProductList(response.data.productList);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchProductList();
  },[]);
  return (
    <div className="product-container">
      {/* <div className="category-list">
        {categoryList?.map((category) => {
          return (
            <div className="">
              <h1>{category.category}</h1>
              <div className="product">
                {productsList
                  ?.filter((item) => item.category === category.category)
                  ?.map((product) => {
                    return (
                      <Suspense fallback={"Loading..."}>
                        <ProductCard product={product} />
                      </Suspense>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div> */}
      <div>
        <h1>Your Top Products here</h1>
      </div>
      <div className="product-list">
        {productList
          ?.sort(() => 0.5 - Math.random()) // randomly shuffle
          .slice(0, 5)
          ?.map((product) => {
            return (
              <Suspense key={product._id} fallback={"Loading..."}>
                <ProductCard product={product} />
              </Suspense>
            );
          })}
      </div>
      <div>
        <h1>Discover New Products</h1>
      </div>
      <div className="product-list">
        {productList
          ?.sort(() => 0.5 - Math.random()) // randomly shuffle
          .slice(0, 5)
          ?.map((product) => {
            return (
              <Suspense key={product._id} fallback={"Loading..."}>
                <ProductCard product={product} />
              </Suspense>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
