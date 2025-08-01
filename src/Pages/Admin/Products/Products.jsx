import React, { useEffect, useState } from "react";
import style from "./products.module.css";

import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";
import { LIMIT } from "../../../Constants/Constant";
import Pagination from "../../../Components/Admin/Pagination/Pagination";
import { MdDelete, MdEdit } from "react-icons/md";

const Products = () => {
  const TABLE_KEYS = [
    "Name",
    "price",
    "rating",
    "stock",
    "totalReviews",
    "highlights",
    "specifications",
    "action",
  ];
  const [totalPages, setTotalPages] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const fetchProductList = async () => {
    const qP = new URLSearchParams();
    qP.append("limit", LIMIT);
    qP.append("page", page);
    selectedCategory && qP.append("category", selectedCategory);
    keyword && qP.append("keyword", keyword);
    try {
      const response = await axiosInstanceV1.get(`/products?${qP.toString()}`);
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
  const fetchCategoryList = async () => {
    const qP = new URLSearchParams();
    qP.append("limit", LIMIT);
    qP.append("page", page);
    try {
      const response = await axiosInstanceV1.get(`/category?${qP.toString()}`);
      if (response.status === 200) {
        setCategoryList(response.data.categoryList);
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
    if (keyword) {
      const debounce = setTimeout(() => {
        fetchProductList();
      }, 1000);
      return () => clearTimeout(debounce);
    }
    fetchProductList();
    setSearchParams({ page });
  }, [page, selectedCategory, keyword]);

  useEffect(() => {
    fetchCategoryList();
  }, []);
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
          <section className={style.header}>
            <select
              name="category"
              id="category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">Category</option>
              {categoryList?.map((item) => {
                return (
                  <option value={item._id} key={item._id} className="option">
                    {item.name}
                  </option>
                );
              })}
            </select>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search Product"
              className={style.search}
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
          </section>
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
                      <td className={style.td}>
                        {product.highlights?.map((highlight, i) => (
                          <li className={style.highlight} key={i}>
                            {highlight}
                          </li>
                        ))}
                      </td>
                      <td className={style.td}>
                        {" "}
                        {product?.specifications &&
                          Object.keys(product?.specifications).map(
                            (key, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  gap: "0.6rem",
                                }}
                                className={style.highlight}
                              >
                                <span style={{ fontWeight: "600" }}>
                                  {key} :{" "}
                                </span>
                                <span style={{ fontWeight: "normal" }}>
                                  {product?.specifications[key]}
                                </span>
                              </div>
                            )
                          )}
                      </td>

                      <td className={`${style.td} `}>
                        <div className={style.action}>
                          {/* <button className={style.view}>View</button> */}
                          <button
                            className={style.edit}
                            onClick={(e) => handleEdit(e, product)}
                          >
                            <MdEdit size={28} />
                          </button>
                          <button
                            className={style.delete}
                            onClick={() => deleteProduct(product._id)}
                          >
                            <MdDelete size={28} />
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
