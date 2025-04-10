import React, { Suspense } from "react";
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
  return (
    <div>
      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <Suspense fallback={null}>
        <Category />
      </Suspense>

      <Suspense fallback={null}>
        <Products />
      </Suspense>
    </div>
  );
};

export default Home;
