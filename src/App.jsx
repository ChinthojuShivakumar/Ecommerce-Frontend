import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home/Home";
import React, { Suspense, useEffect } from "react";
import NotFound from "./Pages/NotFound/NotFound";
import Order from "./Pages/Orders/Order";
import AdminRoutes from "./Pages/Admin/Routes/Routes";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./Utils/ErrorBoundary";
import Account from "./Pages/Account/Account";
import OrderDetailPage from "./Pages/Orders/OrderDetailPage";
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
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) return; // allow pinch zoom
      e.preventDefault();
    };
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
  return (
    <BrowserRouter>
      <ErrorBoundary>
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
          <Route
            path="/order"
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
                <OrderDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/my profile"
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
                <Account />
              </Suspense>
            }
          />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>

      <ToastContainer limit={2} />
    </BrowserRouter>
  );
}

export default App;
