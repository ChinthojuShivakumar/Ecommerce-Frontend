import React from "react";
import styles from "./drawer.module.css";

const BottomDrawer = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.drawer} ${isOpen ? styles.slideUp : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handle}></div>
        {children}
      </div>
    </div>
  );
};

export default BottomDrawer;
