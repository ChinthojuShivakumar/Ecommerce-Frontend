// components/Products/ProductSkeleton.jsx
import React from "react";
import styles from "./productskelton.module.css";

const ProductSkeleton = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={`${styles.cardImage} ${styles.skeleton}`} />
      <div className={styles.cardBody}>
        <div className={`${styles.titleSkeleton} ${styles.skeleton}`} />
        <div className={styles.cardItem}>
          <div className={`${styles.priceSkeleton} ${styles.skeleton}`} />
          <div className={`${styles.ratingSkeleton} ${styles.skeleton}`} />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
