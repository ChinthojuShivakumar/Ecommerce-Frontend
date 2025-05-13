import React, { useEffect, useState } from "react";
import styles from "./action.module.css";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstanceV1, BASE_URL } from "../../../Utils/ApiServices";

const Action = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialInputs = {
    images: [],
    imagePreviews: [],
    name: "",
    description: "",
    stock: "",
    price: "",
    rating: "",
    category: "",
    highlights: ["Test 1", "Test 2", "Test 3"],
    specifications: [{ key: "key 1", value: "Value 1" }],
  };
  const [inputs, setInputs] = useState(initialInputs);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hightLights, setHighLights] = useState("");
  const [sK, setSK] = useState("");
  const [sV, setSV] = useState("");

  const handleChange = (e, type) => {
    e.preventDefault();

    if (type === "file") {
      const files = Array.from(e.target.files);
      const readers = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then((imagePreviews) => {
        setInputs((prevInputs) => ({
          ...prevInputs,
          imagePreviews: imagePreviews,
          images: files,
        }));
      });
    }

    if (type === "name") {
      setInputs({ ...inputs, name: e.target.value });
      return;
    }
    if (type === "category") {
      setInputs({ ...inputs, category: e.target.value });
      return;
    }
    if (type === "stock") {
      setInputs({ ...inputs, stock: e.target.value });
      return;
    }
    if (type === "price") {
      setInputs({ ...inputs, price: e.target.value });
      return;
    }
    if (type === "rating") {
      setInputs({ ...inputs, rating: e.target.value });
      return;
    }
    if (type === "description") {
      setInputs({ ...inputs, description: e.target.value });
      return;
    }
  };

  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    const qP = new URLSearchParams();

    try {
      // if (page > totalPages) return;
      setLoading(true);
      const response = await axiosInstanceV1.get(
        `${BASE_URL}/category?${qP.toString()}`
      );
      if (response.status === 200) {
        // setUserList((prevData) => [...prevData, ...response.data.userList]);
        setCategoryList(response.data.categoryList);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fD = new FormData();
    fD.append("name", inputs.name);
    fD.append("category", inputs.category);
    fD.append("stock", inputs.stock);
    fD.append("price", inputs.price);
    fD.append("rating", inputs.rating);
    fD.append("description", inputs.description);

    inputs.images && inputs.images.map((image) => fD.append("image", image));

    if (!isEditing) {
      try {
        setLoading(true);
        const response = await axiosInstanceV1.post("/product", fD, {
          headers: { "Content-Type": "multipart/form-date" },
        });
        if (response.status === 201 && response.data.success) {
          clearInputs();
          navigate("/admin/products");

          return;
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return error;
      }
    }

    try {
      setLoading(true);
      const response = await axiosInstanceV1.put(
        `/product/${location.state._id}`,
        fD,
        {
          headers: { "Content-Type": "multipart/form-date" },
        }
      );
      if (response.status === 202 && response.data.success) {
        clearInputs();
        navigate("/admin/products");

        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  useEffect(() => {
    console.log(location);
    clearInputs();
    if (location.state !== null) {
      setIsEditing(true);
      setInputs({
        ...inputs,
        category: location.state.category,
        description: location.state.description,
        images: location.state.images,
        imagePreviews: location.state.images,
        name: location.state.name,
        price: location.state.price,
        rating: location.state.rating,
        stock: location.state.stock,
      });
    }
  }, [location.state]);

  const clearInputs = () => {
    setInputs(initialInputs);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.sidemenu}>
          <SideMenu />
        </div>
        <div className={styles.body}>
          <h1 style={{ textTransform: "capitalize" }}>
            {location.pathname.split("/").pop()} Product
          </h1>
          <div className={styles.modalcontent}>
            <div className={styles.inputcontainer}>
              <label htmlFor="name" className={styles.label}>
                Product Name
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "name")}
                value={inputs.name}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="category" className={styles.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                className={styles.input}
                style={{ width: "100%" }}
                value={inputs.category}
                onChange={(e) => handleChange(e, "category")}
              >
                <option value="">Categories</option>
                {categoryList.map((category) => {
                  return (
                    <option
                      value={category._id}
                      key={category._id}
                      className={styles.category}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "description")}
                rows={5}
                cols={5}
                value={inputs.description}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="price" className={styles.label}>
                Price
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "price")}
                value={inputs.price}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="rating" className={styles.label}>
                Rating
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "rating")}
                value={inputs.rating}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="stock" className={styles.label}>
                Stock
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "stock")}
                value={inputs.stock}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="stock" className={styles.label}>
                Highlights
              </label>
              <div className={styles.highlightinput}>
                <input
                  id="name"
                  className={styles.input}
                  type="text"
                  required
                  name="name"
                  onChange={(e) => handleChange(e, "stock")}
                  value={inputs.stock}
                />
                <button className={styles.plus}> Add </button>
              </div>
              <div>
                {inputs.highlights.map((highlight) => {
                  return (
                    <div className={styles.highlight}>
                      <ul className={styles.highlightlist}>
                        <li className={styles.highlightitem}>{highlight}</li>
                      <button className={styles.remove}> Remove </button>

                      </ul>

                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="stock" className={styles.label}>
                Specifications
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "stock")}
                value={inputs.stock}
              />
            </div>

            <div className={styles.inputcontainer}>
              <div className={styles.imagecontainer}>
                {inputs.imagePreviews &&
                  inputs.imagePreviews?.map((image, i) => (
                    <img alt={i} src={image} key={i} className={styles.image} />
                  ))}
              </div>
              <input
                type="file"
                multiple
                className={styles.file}
                onChange={(e) => handleChange(e, "file")}
              />
            </div>
          </div>
          <div className={styles.action}>
            <button
              className={styles.cancel}
              onClick={() => {
                clearInputs();
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button
              className={styles.submit}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Action;
