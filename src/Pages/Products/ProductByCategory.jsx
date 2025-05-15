import { useEffect, useState } from "react";
// import ProductList from "../../../updated_products.json";
import { useLocation } from "react-router-dom";
import ProductCard from "../../Components/Products/ProductCard";
import "./productlist.css";
import Header from "../../Components/Layout/Header";
import { axiosInstanceV1 } from "../../Utils/ApiServices";

const ProductByCategory = () => {
  const location = useLocation();
  const category = location.search.split("=")[1];
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    const qP = new URLSearchParams();
    category && qP.append("category", category);
    try {
      const response = await axiosInstanceV1.get(`/product?${qP.toString()}`);
      if (response.status === 200) {
        setProductList(response.data.productList);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [category]);

  return (
    <div className="category-container">
      <Header />
      <div className="category-product-list">
        {productList?.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductByCategory;
