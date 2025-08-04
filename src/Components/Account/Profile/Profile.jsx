import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { fetchUserData, modalStyle } from "../../../Constants/Constant";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";

const Profile = () => {
  const [pF, setPF] = useState(true);
  const [mF, setMF] = useState(true);
  const [eF, setEF] = useState(true);
  const ADDRESS_TYPE = ["Male", "Female", "Others"];
  const initialInputs = {
    _id: "",
    name: "",
    phoneNumber: "",
    email: "",
  };

  const [inputs, setInputs] = useState(initialInputs);

  const handleChange = (e, type) => {
    e.preventDefault();
    if (type === "firstName") {
      setInputs({ ...inputs, name: e.target.value });
      return;
    }
    if (type === "lastName") {
      setInputs({ ...inputs, name: ` ${e.target.value}` });
      return;
    }
    if (type === "phoneNumber") {
      setInputs({ ...inputs, phoneNumber: Number(e.target.value) });
      return;
    }
    if (type === "email") {
      setInputs({ ...inputs, houseNumber: e.target.value });
      return;
    }
    if (type === "gender") {
      setInputs({ ...inputs, village: e.target.value });
      return;
    }
  };

  const updateUser = async (_id) => {
    try {
      const response = await axiosInstanceV1.put(`/user/${inputs._id}`, inputs);
      if (response.status === 202) {
        alert(response.data.message);
      }
      return;
    } catch (error) {
      return error;
    }
  };

  const handleDeactivateAccount = async (_id) => {
    try {
      if (window.confirm("Are you sure want to deactivate account ?")) {
        const response = await axiosInstanceV1.post(
          `/user/deactivate/${inputs._id}`,
          {
            status: "Inactive",
          }
        );
        if (response.status === 202) {
          alert(response.data.message);
        }
      }
      return;
    } catch (error) {
      return error;
    }
  };
  const handleDeleteAccount = async (_id) => {
    try {
      if (
        window.confirm(
          "Are you sure want to delete account ? Your All account access data will be lost Once deleted..!"
        )
      ) {
        const response = await axiosInstanceV1.delete(`/user/${_id}`);
        if (response.status === 200) {
          alert(response.data.message);
        }
      }
      return;
    } catch (error) {
      return error;
    }
  };

  const clearInputs = () => {
    setInputs(initialInputs);
  };

  useEffect(() => {
    setInputs(fetchUserData());
  }, []);

  // console.log(inputs);

  return (
    <div className={styles.profile}>
      <h1>My Profile</h1>

      <h2 style={{ marginTop: "10px" }}>
        Personal Information:{" "}
        <span className={styles.edit} onClick={() => setPF(!pF)}>
          Edit
        </span>{" "}
      </h2>

      <div className={styles.container}>
        <div className={styles.modal_body}>
          <div className={styles.item}>
            <label htmlFor="">First Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              onChange={(e) => handleChange(e, "firstName")}
              value={inputs?.name}
              disabled={pF}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="">Last Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.input}
              onChange={(e) => handleChange(e, "lastName")}
              value={inputs?.name}
              disabled={pF}
            />
          </div>

          <div className={styles.item}>
            <label htmlFor="">Gender: </label>
            <div className={styles.types}>
              {ADDRESS_TYPE.map((item, i) => (
                <div className={styles.addressItem} key={i}>
                  <input
                    type="radio"
                    id={i}
                    value={item}
                    onChange={(e) =>
                      setInputs({ ...inputs, gender: e.target.value })
                    }
                    checked={item === inputs?.gender}
                    disabled={pF}
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <h2 style={{ marginTop: "10px" }}>
          Email{" "}
          <span className={styles.edit} onClick={() => setEF(!eF)}>
            Edit
          </span>{" "}
        </h2>
        <div className={styles.item}>
          {/* <label htmlFor="">Email: </label> */}
          <input
            type="email"
            name="email"
            id="email"
            className={styles.input}
            onChange={(e) => handleChange(e, "email")}
            value={inputs?.email}
            disabled={eF}
            style={{ marginTop: "10px" }}
          />
        </div>
        <h2 style={{ marginTop: "10px" }}>
          Mobile Number{" "}
          <span className={styles.edit} onClick={() => setMF(!mF)}>
            Edit
          </span>{" "}
        </h2>
        <div className={styles.item}>
          {/* <label htmlFor="">Phone Number: </label> */}
          <input
            type="number"
            name="number"
            id="number"
            className={styles.input}
            onChange={(e) => handleChange(e, "phoneNumber")}
            value={inputs?.phoneNumber}
            disabled={mF}
            style={{ marginTop: "10px" }}
          />
        </div>
        <div className={styles.modal_footer}>
          <button
            type="button"
            className={styles.action}
            disabled={mF && pF && eF}
            onClick={() => updateUser(inputs._id)}
          >
            Save
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <p
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => handleDeactivateAccount(inputs._id)}
        >
          Deactivate Account
        </p>
        <p
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleDeleteAccount(inputs._id)}
        >
          Delete Account
        </p>
      </div>
    </div>
  );
};

export default Profile;
