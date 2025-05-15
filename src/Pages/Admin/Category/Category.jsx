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
  const [categoryId, setCategoryId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
    setIsEditing(false);
    clearInputs();
  };
  const handleModelOpen = () => {
    setIsEditing(false);
    clearInputs();
    setOpen(true);
  };

  const initialState = {
    name: "",
    image: "",
    imagePreview: "",
  };

  const [inputs, setInputs] = useState(initialState);

  const handleChange = (e, type) => {
    e.preventDefault();
    if (type == "name") {
      setInputs({ ...inputs, name: e.target.value });
      return;
    }
    if (type == "image") {
      const fR = new FileReader();
      fR.onloadend = () => {
        setInputs({
          ...inputs,
          imagePreview: fR.result, // For display
          image: e.target.files[0],
        });
      };
      fR.readAsDataURL(e.target.files[0]);

      return;
    }
    if (type == "phonenumber") {
      setInputs({ ...inputs, phoneNumber: e.target.value });
      return;
    }
    if (type == "role") {
      setInputs({ ...inputs, role: e.target.value });
      return;
    }
    // if (type == "confirmpassword") {
    //   setInputs({ ...inputs, confirmPassword: e.target.value });
    //   return;
    // }
    // if (type == "status") {
    //   setInputs({ ...inputs, status: e.target.value });
    //   return;
    // }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (inputs.password !== inputs.confirmPassword) {
    //   errorMessage("Password is not matched");
    //   return;
    // }
    const fD = new FormData();
    fD.append("name", inputs.name);
    fD.append("image", inputs.image);

    if (!isEditing) {
      try {
        setLoading(true);
        const response = await axiosInstanceV1.post(
          `${BASE_URL}/category`,
          fD,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 201) {
          clearInputs();
          fetchCategoryList(page, limit);
          return true;
        }
        setLoading(false);
      } catch (error) {
        clearInputs();
        setLoading(false);
        return error;
      }
    } else {
      try {
        setLoading(true);
        const response = await axiosInstanceV1.put(
          `${BASE_URL}/category/${categoryId}`,
          fD,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 202) {
          clearInputs();
          fetchCategoryList(page, limit);
          return true;
        }
        setLoading(false);
      } catch (error) {
        clearInputs();
        setLoading(false);
        return error;
      }
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();

    const findCategory = categoryList.find((category) => category._id === id);
    if (!findCategory) {
      clearInputs();
      return;
    } else {
      clearInputs();
      setInputs({
        ...inputs,
        name: findCategory.name,
        imagePreview: findCategory.image,
        image: findCategory.image,
      });
      setCategoryId(id);
      setIsEditing(true);
      setOpen(true);
    }
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
        setTotalCategories(response.data.totalCategories);
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

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstanceV1.delete(
        `${BASE_URL}/category/${id}`
      );
      if (response.status === 202) {
        fetchCategoryList(page, limit);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const clearInputs = () => {
    setInputs(initialState);
    setOpen(false);
    setIsEditing(false);
    setCategoryId(null);
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
          {/* <div>
            <h1>Category Listing Page</h1>
          </div> */}
          <div className={style.add}>
            <button type="button" onClick={handleModelOpen}>
              Add Category
            </button>
          </div>
          <div className={style.tableContainer}>
            <div className={style.listCount}>
              <h3>Total Category List</h3>
              <p>
                Showing <strong>{(page - 1) * limit + 1}</strong> of{" "}
                <strong>{totalCategories}</strong> Categories
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
                      <td className={style.td}>{product.name}</td>
                      {/* <td className={`${style.tablecell} ${style.td}`}>
                        <img
                          className={style.image}
                          src={product.image}
                          alt={product.name}
                        />
                      </td> */}
                      <td className={`${style.td} `}>
                        <div className={style.action}>
                          <button
                            className={style.edit}
                            onClick={(e) => handleEdit(e, product._id)}
                          >
                            Edit
                          </button>
                          <button
                            className={style.delete}
                            onClick={() => deleteCategory(product._id)}
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
        {/* <TextField
          htmlFor={"category"}
          id={"category"}
          type={"text"}
          name={"category"}
          label={"Category Name"}
          required={true}
        /> */}
        <div className={style.modalcontent}>
          <div className={style.inputcontainer}>
            <label htmlFor="name" className={style.label}>
              Category Name
            </label>
            <input
              id="name"
              className={style.input}
              type="text"
              required
              name="name"
              onChange={(e) => handleChange(e, "name")}
              value={inputs.name}
            />
          </div>
          <div className={style.imagecontainer}>
            {inputs.imagePreview && (
              <img
                className={style?.image}
                src={inputs.imagePreview}
                alt={"image"}
              />
            )}
            <input
              type="file"
              name="file"
              id="file"
              onChange={(e) => handleChange(e, "image")}
            />
          </div>
          <div className={style.action}>
            <button className={style.cancel} onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              className={style.submit}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Category;
