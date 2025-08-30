import React, { Suspense, useEffect, useState } from "react";
// import productsList from "../../../updated_products.json";
import Header from "../../Components/Layout/Header";
const ProductCard = React.lazy(() =>
  import("../../Components/Products/ProductCard")
);
import "./productlist.css";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import Filters from "../../Components/Products/Filters/Filters";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyRecords from "../../Components/EmptyRecords/EmptyRecords";
import Loader from "../../Utils/Loader";

const ProductsList = () => {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const qP = new URLSearchParams();
  const [loader, setLoader] = useState(false);
  const location = useLocation()
  // console.log(location);


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

  const fetchProductList = async ({
    selectedCategory,
    selectedPrice,
    search,
  }) => {
    const qP = new URLSearchParams();

    if (selectedCategory) qP.set("category", selectedCategory);
    if (selectedPrice) qP.set("price", selectedPrice);
    if (search) qP.set("keyword", search);

    try {
      setLoader(true);
      const response = await axiosInstanceV1.get(`/products?${qP.toString()}`);
      if (response.status === 200) {
        setProductList(response.data.productList);
      }
      setLoader(false);
    } catch (error) {
      console.error("Fetch failed", error);
      setLoader(false);
      return error;
    }
  };

 useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const categoryFromURL = urlParams.get("category");
  if (categoryFromURL) {
    setSelectedCategory(categoryFromURL);
  }
}, [location.search]);


  useEffect(() => {
    const qP = new URLSearchParams();

    if (selectedCategory) qP.set("category", selectedCategory);
    if (selectedPrice) qP.set("price", selectedPrice);
    if (search) qP.set("keyword", search);

    navigate(`/products?${qP.toString()}`, { replace: true });

    const debounce = setTimeout(() => {
      fetchProductList({ selectedCategory, selectedPrice, search });
    }, 500);

    return () => clearTimeout(debounce); // cleanup for debounce
  }, [location.search, selectedPrice, search, selectedCategory]);





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
        <div className="section">
          <div className="search-container">
            <input
              type="search"
              name="search"
              id="search"
              className="searchInput"
              placeholder="Search Products"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          {/* product-body product-list list */}
          {loader ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader />
            </div>
          ) : !productList.length ? (
            <EmptyRecords Page={"Products"} />
          ) : (
            <div className="list-products">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
