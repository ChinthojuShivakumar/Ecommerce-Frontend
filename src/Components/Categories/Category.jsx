import React from "react";
import categoryList from "../../../updated_categories.json";
import "./Category.css";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const navigate = useNavigate();
  const handleRedirectCategory = (e, category) => {
    e.preventDefault();
    navigate(`/category?q=${category}`);
    return
  };
  return (
    <div className="cat-container">
      <div className="cat-items">
        {categoryList?.map((category, i) => {
          return (
            <ul
              className="cat-item"
              key={i}
              onClick={(e) => handleRedirectCategory(e, category.category)}
            >
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
