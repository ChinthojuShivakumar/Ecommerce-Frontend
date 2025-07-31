import React, { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <div
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        border: "4px solid var(--secondary-color)",
        borderTop: "4px solid white",
        animation: "spin 1s linear infinite",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
};

export default Loader;
