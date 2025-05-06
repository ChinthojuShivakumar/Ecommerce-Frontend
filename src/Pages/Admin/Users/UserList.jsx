import React, { useEffect, useState } from "react";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import styles from "./user.module.css";
import Modal from "../../../Components/Modal/Modal";
import { errorMessage } from "../../../Utils/Alert";
import { axiosInstanceV1, BASE_URL } from "../../../Utils/ApiServices";
import { LIMIT } from "../../../Constants/Constant";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../../Components/Admin/Pagination/Pagination";

const UserList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const TABLE_KEYS = ["name", "phoneNumber", "email", "status", "role"];
  const [totalPages, setTotalPages] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [status, setStatus] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);

  const handleCloseModal = () => {
    setOpen(false);
    clearInputs();
  };
  const handleModelOpen = () => {
    clearInputs();
    setOpen(true);
  };
  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    // confirmPassword: "",
    status: "",
  };
  const [inputs, setInputs] = useState(initialState);
  const handleChange = (e, type) => {
    e.preventDefault();
    if (type == "name") {
      setInputs({ ...inputs, name: e.target.value });
      return;
    }
    if (type == "email") {
      setInputs({ ...inputs, email: e.target.value });
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

    if (!isEditing) {
      try {
        setLoading(true);
        const response = await axiosInstanceV1.post(`${BASE_URL}/user`, inputs);
        if (response.status === 201) {
          clearInputs();
          fetchUserList(page, limit);
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
          `${BASE_URL}/user/${userId}`,
          inputs
        );
        if (response.status === 202) {
          clearInputs();
          fetchUserList(page, limit);
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

  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserList = async (page, status = null) => {
    const qP = new URLSearchParams();
    qP.append("limit", LIMIT);
    qP.append("page", page);
    // console.log(status);

    status !== "" && qP.append("status", inputs.status || status);
    try {
      // if (page > totalPages) return;
      setLoading(true);
      const response = await axiosInstanceV1.get(
        `${BASE_URL}/user?${qP.toString()}`
      );
      if (response.status === 200) {
        // setUserList((prevData) => [...prevData, ...response.data.userList]);
        setUserList(response.data.userList);
        setTotalPages(response.data.totalPages);
        setLimit(response.data.limit);
        setTotalUsers(response.data.totalUsers);
      } else {
        setUserList([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();

    const findUser = userList.find((user) => user._id === id);
    if (!findUser) {
      clearInputs();
      return;
    } else {
      clearInputs();
      setInputs({
        ...inputs,
        name: findUser.name,
        email: findUser.email,
        phoneNumber: findUser.phoneNumber,
        status: findUser.status,
        role: findUser.role,
      });
      setUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstanceV1.delete(`${BASE_URL}/user/${id}`);
      if (response.status === 202) {
        fetchUserList();
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
  };

  useEffect(() => {
    fetchUserList(page, status);
    setSearchParams({ page });
  }, [page, status]);
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.sidemenu}>
          <SideMenu />
        </div>
        <div className={styles.body}>
          <div className={styles.add}>
            <button type="button" onClick={handleModelOpen}>
              Add User
            </button>
          </div>
          <div>
            <select
              name="status"
              id="status"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="" disabled>
                Status
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {loading ? (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
              }}
            >
              Loading...
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <div className={styles.listCount}>
                <h3>Total Users List</h3>
                <p>
                  Showing <strong>{(page - 1) * limit + 1}</strong> of{" "}
                  <strong>{totalUsers}</strong> Users
                </p>
              </div>
              <table className={styles.table}>
                <thead className={styles.tablehead}>
                  <tr className={styles.tablerow}>
                    {TABLE_KEYS &&
                      TABLE_KEYS.map((key, index) => (
                        <th className={styles.th} key={index}>
                          {key}
                        </th>
                      ))}
                    <th className={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody className={styles.body}>
                  {userList.map((user, i) => {
                    return (
                      <tr key={i} className={styles.tablerow}>
                        <td className={styles.td}>{user.name}</td>
                        <td className={`${styles.td}`}>{user.phoneNumber}</td>
                        <td className={` ${styles.td}`}>{user.email}</td>
                        <td
                          className={` ${styles.td} ${
                            user.status === "Active"
                              ? styles.active
                              : styles.inactive
                          }`}
                        >
                          {user.status}
                        </td>
                        <td className={styles.td}>{user.role}</td>
                        <td className={`${styles.td} `}>
                          <div className={styles.action}>
                            <button
                              className={styles.edit}
                              onClick={(e) => handleEdit(e, user._id)}
                            >
                              Edit
                            </button>
                            <button
                              className={styles.delete}
                              onClick={() => deleteUser(user._id)}
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
              {/* <div className={styles.paginationcontainer}>
                <button
                  type="button"
                  className={`${styles.previous} ${
                    userList.length == 0 && styles.disable
                  }`}
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={page === 1}
                >
                  &lt;
                </button>
                <ul className={styles.pagebody}>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    return (
                      <li
                        key={i}
                        className={`${styles.pagenumber} ${
                          i + 1 === page && styles.activepage
                        } ${userList.length == 0 && styles.disable}`}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  className={`${styles.next} ${
                    userList.length == 0 && styles.disable
                  }`}
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page === totalPages}
                >
                  &gt;
                </button>
              </div> */}
              <Pagination
                data={userList}
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          )}
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
        <div className={styles.modalcontent}>
          <div className={styles.inputcontainer}>
            <label htmlFor="name" className={styles.label}>
              Full Name
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
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              required
              name="email"
              onChange={(e) => handleChange(e, "email")}
              value={inputs.email}
            />
          </div>
          <div className={styles.inputcontainer}>
            <label htmlFor="phonenumber" className={styles.label}>
              Phone Number
            </label>
            <input
              id="phonenumber"
              className={styles.input}
              type="number"
              required
              name="phoneNumber"
              onChange={(e) => handleChange(e, "phonenumber")}
              value={inputs.phoneNumber}
            />
          </div>
          <div className={styles.inputcontainer}>
            <select
              name="status"
              id="status"
              onChange={(e) => handleChange(e, "role")}
              value={inputs.role}
              style={{ width: "100%" }}
            >
              <option value="" disabled>
                Status
              </option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER ADMIN">Super Admin</option>
            </select>
          </div>
          {/* <div className={styles.inputcontainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              className={styles.input}
              type="password"
              required
              name="password"
              onChange={(e) => handleChange(e, "password")}
              value={inputs.password}
            />
          </div>
          <div className={styles.inputcontainer}>
            <label htmlFor="confirmpassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmpassword"
              className={styles.input}
              type="password"
              required
              name="confirmpassword"
              onChange={(e) => handleChange(e, "confirmpassword")}
              value={inputs.confirmPassword}
            />
          </div> */}
          <div className={styles.radiocontainer}>
            <label htmlFor="status">Status</label>
            <div className={styles.radiogroup}>
              <div className={styles.radioitem}>
                <input
                  type="radio"
                  id="status"
                  name="status"
                  value="Active"
                  onChange={(e) =>
                    setInputs({ ...inputs, status: e.target.value })
                  }
                  checked={inputs.status === "Active"}
                />
                <label htmlFor="status">Active</label>
              </div>
              <div className={styles.radioitem}>
                <input
                  type="radio"
                  id="status"
                  name="status"
                  value="Inactive"
                  onChange={(e) =>
                    setInputs({ ...inputs, status: e.target.value })
                  }
                  checked={inputs.status === "Inactive"}
                />
                <label htmlFor="status">Inactive</label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.action}>
          <button className={styles.cancel} onClick={handleCloseModal}>
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
      </Modal>
    </div>
  );
};

export default UserList;
