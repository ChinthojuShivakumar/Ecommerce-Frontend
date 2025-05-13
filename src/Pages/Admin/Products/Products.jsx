import React, { useEffect, useState } from "react";
import style from "./products.module.css";

import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstanceV1, BASE_URL } from "../../../Utils/ApiServices";
import { LIMIT } from "../../../Constants/Constant";
import Pagination from "../../../Components/Admin/Pagination/Pagination";

const Products = () => {
  const TABLE_KEYS = [
    "Name",
    "price",
    "rating",
    "stock",
    "totalReviews",
    "action",
  ];
  const [totalPages, setTotalPages] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  
  const [productList, setProductList] = useState([]);

  const fetchProductList = async () => {
    const qP = new URLSearchParams();
    qP.append("limit", LIMIT);
    qP.append("page", page);
    try {
      const response = await axiosInstanceV1.get(`/product?${qP.toString()}`);
      if (response.status === 200) {
        setProductList(response.data.productList);
        setTotalPages(response.data.totalPages);
        setLimit(response.data.limit);
        setTotalProducts(response.data.totalCategories);
      }
    } catch (error) {
      return error;
    }
  };

  const handleEdit = (e, update) => {
    e.preventDefault();

    const findProduct = productList.find(
      (product) => product._id === update._id
    );
    if (findProduct) {
      navigate("/admin/products/update", { state: findProduct });
      return;
    }

    return;
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axiosInstanceV1.delete(`/product/${id}`);
      if (response.status === 202) {
        fetchProductList();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [page]);
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.sidemenu}>
          <SideMenu />
        </div>
        <div className={style.body}>
          <div className={style.add}>
            <button
              type="button"
              onClick={() => navigate("/admin/products/add")}
            >
              Add Product
            </button>
          </div>
          <div className={style.tableContainer}>
            <div className={style.listCount}>
              <h3>Total Products List</h3>
              <p>
                Showing <strong>{(page - 1) * limit + 1}</strong> of{" "}
                <strong>{totalProducts}</strong> bookings
              </p>
            </div>
            <table className={style.table}>
              <thead className={style.tablehead}>
                <tr className={style.tablerow}>
                  {TABLE_KEYS &&
                    TABLE_KEYS.map((key, index) => (
                      <th className={style.th} key={index}>
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className={style.body}>
                {productList.map((product) => {
                  return (
                    <tr key={product._id} className={style.tablerow}>
                      <td className={style.td}>{product.name}</td>
                      <td className={style.td}>Rs.{product.price}</td>
                      <td className={style.td}>{product.rating}</td>

                      <td className={style.td}>{product.stock}</td>
                      <td className={style.td}>{product.totalReviews}</td>

                      <td className={`${style.td} `}>
                        <div className={style.action}>
                          <button className={style.view}>View</button>
                          <button
                            className={style.edit}
                            onClick={(e) => handleEdit(e, product)}
                          >
                            Edit
                          </button>
                          <button
                            className={style.delete}
                            onClick={() => deleteProduct(product._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              data={productList}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
