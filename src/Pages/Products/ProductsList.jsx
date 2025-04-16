import React, { Suspense } from "react";
import productsList from "../../../updated_products.json";
import Header from "../../Components/Layout/Header";
const ProductCard = React.lazy(() =>
  import("../../Components/Products/ProductCard")
);
import "./productlist.css";

const ProductsList = () => {
  return (
    <div>
      <Header />

      <div className="product-list list">
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              Loading...
            </div>
          }
        >
          <div >
            {productsList?.map((product) => {
              return <ProductCard product={product} />;
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsList;
