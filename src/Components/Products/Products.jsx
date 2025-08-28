import React, { Suspense } from "react";
const ProductCard = React.lazy(() => import("./ProductCard"));
import "./product.css";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import ProductSkeleton from "../Skeltons/Product/ProductSkelton";
import { DESKTOP, LAPTOP, TV } from "../../Constants/Constant";

const Products = ({ productList }) => {
  return (
    <div className="product-container">
      <div className="cat-container">
        {productList && (
          <div>
            <div
              style={{
                padding: "10px",
                borderBottom: "1px solid var(--light)",
              }}
            >
              <h2 className="title">Your Top Products here</h2>
            </div>
            <div className="product-list">
              {productList
                ?.sort(() => 0.5 - Math.random()) // randomly shuffle
                .slice(0, TV ? 6 : DESKTOP ? 5 : LAPTOP ? 4 : 6)
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
      <div className="cat-container">
        {productList && (
          <div>
            <div
              style={{
                padding: "10px",
                borderBottom: "1px solid var(--light)",
              }}
            >
              <h2 className="title">Discover Products</h2>
            </div>
            <div className="product-list">
              {productList
                ?.sort(() => 0.5 - Math.random()) // randomly shuffle
                .slice(0, TV ? 6 : DESKTOP ? 5 : LAPTOP ? 4 : 6)
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
    </div>
  );
};

export default Products;
