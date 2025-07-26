import { useEffect, useState } from "react";
import styles from "./filters.module.css";

const Filters = ({
  categoryList,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
}) => {
  const PRICE_RANGE = [
    { label: "Under ₹500", min: 0, max: 500 },
    { label: "₹500 - ₹1,000", min: 500, max: 1000 },
    { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
    { label: "₹2,000 - ₹5,000", min: 2000, max: 5000 },
    { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
    { label: "Above ₹10,000", min: 10000, max: Infinity },
  ];
  const [count, setCount] = useState(5);

  return (
    <div>
      <div className={styles.statuscontainer}>
        <div className={styles.header}>
          <h3 style={{ paddingLeft: "10px" }}>Categories</h3>
        </div>
        <div className={styles.body}>
          {categoryList.slice(0, count).map((item, i) => {
            return (
              <div className={styles.childone} key={i}>
                <input
                  type="checkbox"
                  name={item.name}
                  id={item.name}
                  value={selectedCategory}
                  onChange={() => setSelectedCategory(item._id)}
                  checked={selectedCategory === item._id}
                />
                <label htmlFor={item}>{item.name}</label>
              </div>
            );
          })}
          <p
            style={{ color: "blue", cursor: "pointer", paddingLeft: "10px" }}
            onClick={() => setCount(count == 5 ? categoryList.length : 5)}
          >
            {count <= 5 ? "Show more" : "Show less"}
          </p>
        </div>
        <div className={styles.statuscontainer}>
          <div className={styles.header}>
            <h3 style={{ paddingLeft: "10px" }}>Prices</h3>
          </div>
          <div className={styles.body}>
            {PRICE_RANGE.map((item, i) => {
              return (
                <div key={i} className={styles.childone}>
                  <input
                    type="checkbox"
                    name={item.label}
                    id={item.label}
                    value={selectedPrice}
                    onChange={() => setSelectedPrice(`${item.min}-${item.max}`)}
                  />
                  <label htmlFor={item}>{item.label}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
