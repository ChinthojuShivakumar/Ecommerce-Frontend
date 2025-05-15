import React, { useEffect, useState } from "react";
// import categoryList from "../../../updated_categories.json";
import "./Category.css";
import { useNavigate } from "react-router-dom";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
const Category = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const response = await axiosInstanceV1.get("/category");
      if (response.status === 200) {
        setCategoryList(response.data.categoryList);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);
  const handleRedirectCategory = (e, category) => {
    e.preventDefault();
    navigate(`/category?q=${category}`);
    return;
  };
  return (
    <div className="cat-container">
      <div className="cat-items">
        {categoryList?.map((category, i) => {
          return (
            <ul
              className="cat-item"
              key={i}
              onClick={(e) => handleRedirectCategory(e, category.name)}
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
