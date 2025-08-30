import React, { Suspense, useEffect, useState } from "react";
const ProductCard = React.lazy(() => import("./ProductCard"));
import "./product.css";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import ProductSkeleton from "../Skeltons/Product/ProductSkelton";
import { DESKTOP, LAPTOP, TV } from "../../Constants/Constant";

const Products = ({ productList }) => {
  const [mostBookedProducts, setMostBookedProduct] = useState(null);
  const [newProducts, setNewProducts] = useState(null);

  const fetchMostBookedProducts = async () => {
    try {
      const response = await axiosInstanceV1.get("/products/most");
      if (response.status === 200) {
        setMostBookedProduct(response.data.products);
      }
    } catch (error) {
      return error;
    }
  };
  const fetchNewProducts = async () => {
    try {
      const response = await axiosInstanceV1.get("/products/latest");
      if (response.status === 200) {
        setNewProducts(response.data.products);
      }
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    fetchMostBookedProducts();
    fetchNewProducts();
  }, []);
  return (
    <div className="product-container">
      <div className="cat-container">
        {mostBookedProducts?.length > 0 && (
          <div>
            <div className="card-header">
              <h2 className="title">Most Booked Products</h2>
            </div>
            <div className="product-list">
              {mostBookedProducts
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
        {newProducts?.length > 0 && (
          <div>
            <div className="card-header">
              <h2 className="title">Latest Products</h2>
            </div>
            <div className="product-list">
              {newProducts
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
            <div className="card-header">
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
            <div className="card-header">
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
