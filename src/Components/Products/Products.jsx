import React, { Suspense } from "react";
import productsList from "../../../updated_products.json";
import categoryList from "../../../updated_categories.json";

// import ProductCard from "./ProductCard";
const ProductCard = React.lazy(() => import("./ProductCard"));

import "./product.css";
const Products = () => {
  return (
    <div className="product-container">
      <div className="category-list">
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
      </div>
      {/* <div className="product-list">
        {productsList?.map((product) => {
          return (
            <Suspense fallback={"Loading..."}>
              <ProductCard product={product} />
            </Suspense>
          );
        })}
      </div> */}
    </div>
  );
};

export default Products;
