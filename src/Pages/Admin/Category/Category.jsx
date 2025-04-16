import React from "react";
import style from "./category.module.css";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import categoryList from "../../../../updated_categories.json";

const Category = () => {
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.sidemenu}>
          <SideMenu />
        </div>
        <div className={style.body}>
          <div>
            <h1>Category Listing Page</h1>
          </div>
          <div>
            <div className={style.add}>
              <button type="button">Add Category</button>
            </div>
            <table className={style.table}>
              <thead className={style.tablehead}>
                <tr className={style.tablerow}>
                  {categoryList?.[0] &&
                    Object.keys(categoryList[0]).map((key, index) => (
                      <th className={style.th} key={index}>
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className={style.body}>
                {categoryList.map((product) => {
                  return (
                    <tr className={style.tablerow}>
                      <td className={style.td}>{product.category}</td>
                      <td className={`${style.tablecell} ${style.td}`}>
                        <img
                          className={style.image}
                          src={product.image}
                          alt={product.name}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
