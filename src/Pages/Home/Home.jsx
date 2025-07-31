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

  useEffect(() => {
    fetchProductList();
  }, []);
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
