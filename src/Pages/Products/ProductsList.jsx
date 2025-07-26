import React, { Suspense, useEffect, useState } from "react";
// import productsList from "../../../updated_products.json";
import Header from "../../Components/Layout/Header";
const ProductCard = React.lazy(() =>
  import("../../Components/Products/ProductCard")
);
import "./productlist.css";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import Filters from "../../Components/Products/Filters/Filters";

const ProductsList = () => {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchProductList = async () => {
    const qP = new URLSearchParams();
    selectedCategory && qP.append("category", selectedCategory);
    selectedPrice && qP.append("price", selectedPrice);
    try {
      const response = await axiosInstanceV1.get(`/product?${qP.toString()}`);
      if (response.status === 200) {
        setProductList(response.data.productList);
      }
    } catch (error) {
      return error;
    }
  };
  const fetchCategoryList = async () => {
    try {
      const response = await axiosInstanceV1.get("/category");
      if (response.status === 200) {
        setCategoryList(response.data.categoryList);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {
    fetchProductList();
  }, [selectedCategory, selectedPrice]);
  return (
    <div>
      <Header />

      <div className="container">
        <div className="filters">
          <Filters
            categoryList={categoryList}
            selectedCategory={selectedCategory}
            selectedPrice={selectedPrice}
            setSelectedCategory={setSelectedCategory}
            setSelectedPrice={setSelectedPrice}
          />
        </div>
        <div className="product-body product-list list">
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
              return <ProductCard product={product} key={product._id} />;
            })}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
