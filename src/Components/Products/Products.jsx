import React, { Suspense } from "react";
const ProductCard = React.lazy(() => import("./ProductCard"));
import "./product.css";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import ProductSkeleton from "../Skeltons/Product/ProductSkelton";

const Products = ({ productList }) => {
  return (
    <div className="product-container">
      {productList && (
        <div>
          <div>
            <h2>Your Top Products here</h2>
          </div>
          <div className="product-list">
            {productList
              ?.sort(() => 0.5 - Math.random()) // randomly shuffle
              .slice(0, 5)
              ?.map((product) => {
                return (
                  <Suspense key={product._id} fallback={<ProductSkeleton />}>
                    <ProductCard product={product} />
                  </Suspense>
                );
              })}
          </div>
        </div>
      )}
      {productList && (
        <div>
          <div>
            <h2>Discover New Category Products</h2>
          </div>
          <div className="product-list">
            {productList
              ?.sort(() => 0.5 - Math.random()) // randomly shuffle
              .slice(0, 5)
              ?.map((product) => {
                return (
                  <Suspense key={product._id} fallback={<ProductSkeleton />}>
                    <ProductCard product={product} />
                  </Suspense>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
