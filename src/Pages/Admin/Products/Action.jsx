import React, { useState } from "react";
import styles from "./action.module.css";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import { useLocation } from "react-router-dom";

const Action = () => {
  const location = useLocation();
  const [inputs, setInputs] = useState({
    images: [],
    imagePreviews: [],
  });
  const [loading, setLoading] = useState(false)

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
  };
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
                // value={inputs.name}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="name" className={styles.label}>
                Category
              </label>
              <select
                name=""
                id=""
                className={styles.input}
                style={{ width: "100%" }}
              >
                <option value="">Categories</option>
              </select>
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="name" className={styles.label}>
                Description
              </label>
              <textarea
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "name")}
                rows={5}
                cols={5}
                // value={inputs.name}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="name" className={styles.label}>
                Price
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "name")}
                // value={inputs.name}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="name" className={styles.label}>
                Rating
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "name")}
                // value={inputs.name}
              />
            </div>
            <div className={styles.inputcontainer}>
              <label htmlFor="name" className={styles.label}>
                Stock
              </label>
              <input
                id="name"
                className={styles.input}
                type="text"
                required
                name="name"
                onChange={(e) => handleChange(e, "name")}
                // value={inputs.name}
              />
            </div>

            <div className={styles.inputcontainer}>
              <div className={styles.imagecontainer}>
                {inputs.imagePreviews &&
                  inputs.imagePreviews?.map((image, i) => (
                    <img alt={i} src={image} className={styles.image} />
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
            <button className={styles.cancel} >
              Cancel
            </button>
            <button
              className={styles.submit}
              // onClick={handleSubmit}
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
