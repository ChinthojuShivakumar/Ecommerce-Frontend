import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home/Home";
import React, { Suspense } from "react";
import NotFound from "./Pages/NotFound/NotFound";
const Home = React.lazy(() => import("./Pages/Home/Home"));
const ProductsList = React.lazy(() => import("./Pages/Products/ProductsList"));

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
