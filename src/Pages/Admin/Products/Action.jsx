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
    highlights: [],
    specifications: {},
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

    if (type === "highlights") {
      setHighLights(e.target.value);
      return;
    }
    if (type === "key") {
      setSK(e.target.value);
      return;
    }
    if (type === "value") {
      setSV(e.target.value);
      return;
    }
  };

  const addHighlight = (e) => {
    e.preventDefault();

    setInputs({ ...inputs, highlights: [...inputs.highlights, hightLights] });
    setHighLights("");
    return;
  };

  const removeHighlights = (e, index) => {
    e.preventDefault();

    const updatedHighLight = inputs.highlights.filter((_, i) => i !== index);
    setInputs({ ...inputs, highlights: updatedHighLight });
    return;
  };
  const addSpecification = (e) => {
    e.preventDefault();

    if (!sK) {
      alert("Specification Key is Required");
      return;
    }
    if (!sV) {
      alert("Specification value is Required");
      return;
    }

    setInputs({
      ...inputs,
      specifications: {
        ...inputs.specifications, // keep existing specs
        [sK]: sV, // add/update the key-value pair dynamically
      },
    });

    setSK("");
    setSV("");
    return;
  };

  const removeSpecification = (e, key) => {
    e.preventDefault();

   const updatedSpecs = { ...inputs.specifications };
  delete updatedSpecs[key];
  setInputs({ ...inputs, specifications: updatedSpecs });
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
    inputs.highlights &&
      inputs.highlights.map((highlight) => fD.append("highlights", highlight));
    // inputs.specifications &&
    //   inputs.specifications.map((specification) =>
    //     fD.append("specifications", JSON.stringify(specification))
    //   );
    fD.append("specifications", JSON.stringify(inputs.specifications));

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
      console.log(error);
      
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
        highlights: location.state.highlights,
        specifications: location.state.specifications
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
                  onChange={(e) => handleChange(e, "highlights")}
                  value={hightLights}
                />
                <button className={styles.plus} onClick={addHighlight}>
                  {" "}
                  Add{" "}
                </button>
              </div>
              <div>
                {inputs.highlights.map((highlight, i) => {
                  return (
                    <div className={styles.highlight}>
                      <ul className={styles.highlightlist}>
                        <li className={styles.highlightitem}>{highlight}</li>
                        <button
                          className={styles.remove}
                          onClick={(e) => removeHighlights(e, i)}
                        >
                          {" "}
                          Remove{" "}
                        </button>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.specificationinput}>
              <label htmlFor="">Specifications</label>
              <div className={styles.specifications}>
                <div className={styles.inputcontainer}>
                  <label htmlFor="stock" className={styles.label}>
                    Key
                  </label>
                  <input
                    id="name"
                    className={styles.input}
                    type="text"
                    required
                    name="name"
                    onChange={(e) => handleChange(e, "key")}
                    value={sK}
                  />
                </div>
                <div className={styles.inputcontainer}>
                  <label htmlFor="stock" className={styles.label}>
                    Value
                  </label>
                  <input
                    id="name"
                    className={styles.input}
                    type="text"
                    required
                    name="name"
                    onChange={(e) => handleChange(e, "value")}
                    value={sV}
                  />
                </div>
                <button
                  className={`${styles.plus} ${styles.addkey}`}
                  onClick={addSpecification}
                >
                  Add
                </button>
              </div>
              {/* <div className={styles.speccontainer}>
                {inputs.specifications.map((spec, i) => {
                  return (
                    <div className={styles.spec}>
                      <ul className={styles.speclist}>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            width: "100%",
                          }}
                        >
                          <li
                            style={{ width: "100%" }}
                            className={styles.specitem}
                          >
                            {spec.key}
                          </li>
                          <li
                            style={{ width: "100%" }}
                            className={styles.specitem}
                          >
                            {spec.value}
                          </li>
                        </div>
                        <button
                          className={styles.remove}
                          onClick={(e) => removeSpecification(e, i)}
                        >
                          {" "}
                          Remove{" "}
                        </button>
                      </ul>
                    </div>
                  );
                })}
              </div> */}
              <div className={styles.speccontainer}>
                {Object.entries(inputs.specifications).map(
                  ([key, value], i) => (
                    <div key={i} className={styles.spec}>
                      <ul className={styles.speclist}>
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            width: "100%",
                          }}
                        >
                          <li
                            style={{ width: "100%" }}
                            className={styles.specitem}
                          >
                            {key}
                          </li>
                          <li
                            style={{ width: "100%" }}
                            className={styles.specitem}
                          >
                            {value}
                          </li>
                        </div>
                        <button
                          className={styles.remove}
                          onClick={(e) => removeSpecification(e, key)}
                        >
                          Remove
                        </button>
                      </ul>
                    </div>
                  )
                )}
              </div>
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
