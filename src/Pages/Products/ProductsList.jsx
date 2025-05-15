import React, { Suspense, useEffect, useState } from "react";
// import productsList from "../../../updated_products.json";
import Header from "../../Components/Layout/Header";
const ProductCard = React.lazy(() =>
  import("../../Components/Products/ProductCard")
);
import "./productlist.css";
import { axiosInstanceV1 } from "../../Utils/ApiServices";

const ProductsList = () => {
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
  }, []);
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
          {productList?.map((product) => {
            return <ProductCard product={product} />;
          })}
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsList;
