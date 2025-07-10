import { useEffect, useState } from "react";
import styles from "./address.module.css";
import Modal from "../../Modal/Modal";
import { modalStyle } from "../../../Constants/Constant";
import { errorMessage, successMessage } from "../../../Utils/Alert";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";

const Address = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const ADDRESS_TYPE = ["Home", "Work", "Others"];
  const initialInputs = {
    userId: "1",
    name: "",
    phoneNumber: null,
    houseNumber: "",
    village: "",
    state: "",
    district: "",
    mandala: "",
    pincode: null,
    addressType: "",
  };
  const [inputs, setInputs] = useState(initialInputs);

  const [addressList, setAddressList] = useState([]);
  const handleOpenModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleCloseModal = (e) => {
    e.preventDefault();
    setOpen(false);
    clearInputs();
  };

  const handleChange = (e, type) => {
    // e.preventDefault();
    if (type === "name") {
      setInputs({ ...inputs, name: e.target.value });
      return;
    }
    if (type === "phoneNumber") {
      setInputs({ ...inputs, phoneNumber: Number(e.target.value) });
      return;
    }
    if (type === "pincode") {
      setInputs({ ...inputs, pincode: Number(e.target.value) });
      return;
    }
    if (type === "houseNumber") {
      setInputs({ ...inputs, houseNumber: e.target.value });
      return;
    }
    if (type === "village") {
      setInputs({ ...inputs, village: e.target.value });
      return;
    }
    if (type === "mandala") {
      setInputs({ ...inputs, mandala: e.target.value });
      return;
    }
    if (type === "district") {
      setInputs({ ...inputs, district: e.target.value });
      return;
    }
    if (type === "state") {
      setInputs({ ...inputs, state: e.target.value });
      return;
    }
    if (type === "addressType") {
      setInputs({ ...inputs, addressType: e.target.value });
      return;
    }
  };

  const postAddress = async () => {
    try {
      const response = await axiosInstanceV1.post("/address/create", inputs);
      if (response.status === 201) {
        successMessage(response.data.message);
        clearInputs();
        return;
      }
    } catch (error) {
      return errorMessage(error.message);
    }
  };

  const fetchAddressList = async () => {
    try {
      const response = await axiosInstanceV1.get("/address");
      if (response.status === 200) {
        successMessage(response.data.message);
        setAddressList(response.data.addressList);
        return;
      }
    } catch (error) {
      return errorMessage(error.message);
    }
  };

  const clearInputs = () => {
    setEditMode(false);
    setOpen(false);
    setInputs(initialInputs);
  };

  useEffect(() => {
    fetchAddressList();
  }, []);
  return (
    <div>
      <h1>My Address</h1>
      <button type="button" onClick={handleOpenModal}>
        Add Address
      </button>
      {addressList?.map((item) => {
        return (
          <div className={styles.card}>
            <h1>
              {item.name} {item.isDefault && <span>default</span>}
            </h1>
            <p>
              {item.houseNumber}, {item.village}(V), {item.mandala}(M),{" "}
              {item.district}(Dist.)
            </p>
            <p>
              {item.state} -{item.pincode}
            </p>
            <p>Phone Number: {item.phoneNumber}</p>
          </div>
        );
      })}
      <Modal open={open} style={modalStyle}>
        <div className={styles.container}>
          <div className={styles.model_header}>
            <h1> Add Address </h1>
          </div>
          <div className={styles.modal_body}>
            <div className={styles.item}>
              <label htmlFor="">Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                className={styles.input}
                onChange={(e) => handleChange(e, "name")}
                value={inputs.name}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="">Phone Number: </label>
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                className={styles.input}
                onChange={(e) => handleChange(e, "phoneNumber")}
                value={inputs.phoneNumber}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="">House / Flat No: </label>
              <input
                type="text"
                name="houseNumber"
                id="houseNumber"
                className={styles.input}
                onChange={(e) => handleChange(e, "houseNumber")}
                value={inputs.houseNumber}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="">Village: </label>
              <input
                type="text"
                name="village"
                id="village"
                className={styles.input}
                onChange={(e) => handleChange(e, "village")}
                value={inputs.village}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="">Mandala: </label>
              <input
                type="text"
                name="mandala"
                id="mandala"
                className={styles.input}
                onChange={(e) => handleChange(e, "mandala")}
                value={inputs.mandala}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="">District: </label>
              <input
                type="text"
                name="district"
                id="district"
                className={styles.input}
                onChange={(e) => handleChange(e, "district")}
                value={inputs.district}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="">State: </label>
              <input
                type="text"
                name="state"
                id="state"
                className={styles.input}
                onChange={(e) => handleChange(e, "state")}
                value={inputs.state}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="">Pincode: </label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                className={styles.input}
                onChange={(e) => handleChange(e, "pincode")}
                value={inputs.pincode}
              />
            </div>
            <div className={styles.item}>
              <label htmlFor="">Address Type: </label>
              <div className={styles.types}>
                {ADDRESS_TYPE.map((item, i) => (
                  <div className={styles.addressItem} key={i}>
                    <input
                      type="radio"
                      id={i}
                      value={item}
                      onChange={(e) => handleChange(e, "addressType")}
                      checked={item === inputs.addressType}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.modal_footer}>
            <button
              type="button"
              className={styles.action}
              onClick={postAddress}
            >
              Add
            </button>
            <button
              type="button"
              className={styles.close}
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Address;
