import React from "react";
import style from "./products.module.css";
import productList from "../../../../updated_products.json";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";

const Products = () => {
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.sidemenu}>
          <SideMenu />
        </div>
        <div className={style.body}>
          <div className={style.add}>
            <button type="button">Add Product</button>
          </div>
          <div className={style.tableContainer}>
            <div className={style.listCount}>
              <h3>Total Products List</h3>
              <p>
                Showing <strong>6</strong> of{" "}
                <strong>{productList.length}</strong> bookings
              </p>
            </div>
            <table className={style.table}>
              <thead className={style.tablehead}>
                <tr className={style.tablerow}>
                  {productList?.[0] &&
                    Object.keys(productList[0]).map((key, index) => (
                      <th className={style.th} key={index}>
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className={style.body}>
                {productList.map((product) => {
                  return (
                    <tr key={product.id} className={style.tablerow}>
                      <td className={style.td}>{product.id}</td>
                      <td className={style.td}>{product.name}</td>
                      <td className={style.td}>{product.category}</td>
                      <td className={style.td}>{product.description}</td>
                      <td className={style.td}>Rs.{product.price}</td>
                      <td className={style.td}>{product.stock}</td>
                      <td className={style.td}>⭐{product.rating}</td>
                      <td className={style.td}>{product.totalReviews}</td>
                      <td className={`${style.tablecell} ${style.td}`}>
                        <img
                          className={style.images}
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </td>
                      <td className={style.td} style={{width:"18%"}}>
                        {Object.keys(product.specifications).map(
                          (key, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                              }}
                            >
                              <span style={{ fontWeight: "600" }}>{key} : </span>
                              <span>{product.specifications[key]}</span>
                            </div>
                          )
                        )}
                      </td>
                      <td className={style.td}>{product.highlights}</td>
                      <td className={style.td}>{product.offers}</td>
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

export default Products;
