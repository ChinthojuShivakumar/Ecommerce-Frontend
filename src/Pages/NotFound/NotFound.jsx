import React from "react";
import Header from "../../Components/Layout/Header";

const NotFound = () => {
  return (
    <div style={{ fontWeight: "bold" }}>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        404 | NotFound
      </div>
    </div>
  );
};

export default NotFound;
