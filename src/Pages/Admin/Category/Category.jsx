import React, { useEffect, useState } from "react";
import style from "./category.module.css";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import categoryList from "../../../../updated_categories.json";
import Modal from "../../../Components/Modal/Modal";
import TextField from "../../../Components/TextField/TextField";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../../../Constants/Constant";
import { axiosInstanceV1, BASE_URL } from "../../../Utils/ApiServices";
import Pagination from "../../../Components/Admin/Pagination/Pagination";

const Category = () => {
  const [open, setOpen] = useState(false);
  const TABLE_KEYS = ["category", "action"];
  const [totalPages, setTotalPages] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalCategories, setTotalCategories] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleModelOpen = () => {
    setOpen(true);
  };

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryList = async () => {
    const qP = new URLSearchParams();
    qP.append("limit", LIMIT);
    qP.append("page", page);
    console.log("calling");

    try {
      // if (page > totalPages) return;
      setLoading(true);
      const response = await axiosInstanceV1.get(
        `${BASE_URL}/category?${qP.toString()}`
      );
      if (response.status === 200) {
        // setUserList((prevData) => [...prevData, ...response.data.userList]);
        setCategoryList(response.data.categoryList);
        setTotalPages(response.data.totalPages);
        setLimit(response.data.limit);
        setTotalCategories(response.data.totalUsers);
      } else {
        setUserList([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);

      return error;
    }
  };

  useEffect(() => {
    fetchCategoryList(page, limit);
    setSearchParams({ page });
  }, [page]);

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
          <div className={style.add}>
            <button type="button" onClick={handleModelOpen}>
              Add Category
            </button>
          </div>
          <div className={style.tableContainer}>
            <div className={style.listCount}>
              <h3>Total Products List</h3>
              <p>
                Showing <strong>6</strong> of <strong>{totalCategories}</strong>{" "}
                bookings
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
                {categoryList.map((product, i) => {
                  return (
                    <tr key={i} className={`${style.tablerow} `}>
                      <td className={style.td}>{product.category}</td>
                      {/* <td className={`${style.tablecell} ${style.td}`}>
                        <img
                          className={style.image}
                          src={product.image}
                          alt={product.name}
                        />
                      </td> */}
                      <td className={`${style.td} `}>
                        <div className={style.action}>
                          <button className={style.edit}>Edit</button>
                          <button className={style.delete}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              data={categoryList}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        style={{
          maxWidth: "600px",
          // maxHeight: "300px",
          width: "90%",
          borderRadius: "2px",
          position: "relative",
          animation: "fadeInScale 0.3s ease",
        }}
      >
        <TextField
          htmlFor={"category"}
          id={"category"}
          type={"text"}
          name={"category"}
          label={"Category Name"}
          required={true}
        />
      </Modal>
    </div>
  );
};

export default Category;
