import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home/Home";
import React, { Suspense } from "react";
import NotFound from "./Pages/NotFound/NotFound";
import Order from "./Pages/Orders/Order";
import AdminRoutes from "./Pages/Admin/Routes/Routes";
const Home = React.lazy(() => import("./Pages/Home/Home"));
const ProductsList = React.lazy(() => import("./Pages/Products/ProductsList"));
const ProductDetail = React.lazy(() =>
  import("./Pages/Products/ProductDetail")
);
const ProductByCategory = React.lazy(() =>
  import("./Pages/Products/ProductByCategory")
);
const Cart = React.lazy(() => import("./Pages/Cart/Cart"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
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
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/products"
          element={
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
              <ProductsList />
            </Suspense>
          }
        />
        <Route
          path="/category"
          element={
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
              <ProductByCategory />
            </Suspense>
          }
        />
        <Route
          path="/product"
          element={
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
              <ProductDetail />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
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
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/orders"
          element={
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
              <Order />
            </Suspense>
          }
        />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
