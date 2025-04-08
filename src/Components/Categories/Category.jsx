import React from "react";
import categoryList from "../../../updated_categories.json";
import "./Category.css";
const Category = () => {
  return (
    <div className="cat-container">
      <div className="cat-items">
        {categoryList?.map((category, i) => {
          return (
            <ul className="cat-item">
              <img
                className="cat-img"
                src={category.image}
                alt={category.category}
                loading="lazy"
              />
              <li>{category.category}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
