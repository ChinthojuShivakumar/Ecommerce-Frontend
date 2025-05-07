import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../NotFound/NotFound";
import UserList from "../Users/UserList";
import Action from "../Products/Action";
// import Category from "../Category/Category";
// import Bookings from "../Bookings/Bookings";
// import Products from "../Products/Products";
const Dashboard = React.lazy(() => import("../Dashboard/Dashboard"));
const Products = React.lazy(() => import("../Products/Products"));
const Bookings = React.lazy(() => import("../Bookings/Bookings"));
const Category = React.lazy(() => import("../Category/Category"));

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
        path="/users"
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
            <UserList />
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
            <Category />
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
      <Route
        path="/products/:action"
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
            <Action />
          </Suspense>
        }
      />
      <Route
        path="/bookings"
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
            <Bookings />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
