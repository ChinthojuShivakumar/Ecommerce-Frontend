import { useEffect, useState } from "react";
// import ProductList from "../../../updated_products.json";
import { useLocation } from "react-router-dom";
import ProductCard from "../../Components/Products/ProductCard";
import "./productlist.css";
import Header from "../../Components/Layout/Header";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import EmptyRecords from "../../Components/EmptyRecords/EmptyRecords";

const ProductByCategory = () => {
  const location = useLocation();

  const [productList, setProductList] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("q"); // Automatically decodes

  const fetchProductList = async () => {
    const qP = new URLSearchParams();
    category && qP.append("category", category);
    try {
      const response = await axiosInstanceV1.get(`/products?${qP.toString()}`);
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
      {!productList.length && <EmptyRecords Page={"Products"} />}
      <div className="category-product-list">
        {productList?.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProductByCategory;
