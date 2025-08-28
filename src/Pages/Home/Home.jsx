import React, { Suspense, useEffect, useState } from "react";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
const Header = React.lazy(() => import("../../Components/Layout/Header"));
const Products = React.lazy(() => import("../../Components/Products/Products"));
const Category = React.lazy(() =>
  import("../../Components/Categories/Category")
);
// import Header from "../../Components/Layout/Header";
// import Category from "../../Components/Categories/Category";
// import Products from "../../Components/Products/Products";
// import ProductCard from "../../Components/Products/ProductCard";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchProductList = async () => {
    try {
      const response = await axiosInstanceV1.get("/products");
      if (response.status === 200) {
        setProductList(response.data.productList);
      }
    } catch (error) {
      return error;
    }
  };

  const checkBackendConnection = async () => {
    try {
      setLoader(true);
      const response = await axiosInstanceV1.get("/");
      if (response.status === 200) {
        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      return error;
    }
  };

  useEffect(() => {
    checkBackendConnection();
  }, []);

  useEffect(() => {
    fetchProductList();
  }, []);
  if (loader)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <img
          src="icon.jpg"
          alt="Logo"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "10%",
          }}
        />
        <p style={{ color: "black" }}>Loading...</p>
      </div>
    );
  return (
    <div>
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <Suspense fallback={null}>
        <Category />
      </Suspense>

      <Suspense fallback={null}>
        <Products productList={productList} />
      </Suspense>
    </div>
  );
};

export default Home;
