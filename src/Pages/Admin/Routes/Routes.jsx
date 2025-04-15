import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../NotFound/NotFound";
// import Products from "../Products/Products";
const Dashboard = React.lazy(() => import("../Dashboard/Dashboard"));
const Products = React.lazy(()=>import("../Products/Products"))

const AdminRoutes = () => {
  return (
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
            <Dashboard />
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
            <Products />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
