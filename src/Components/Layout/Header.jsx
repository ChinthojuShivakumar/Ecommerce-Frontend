import React, { useEffect, useState } from "react";
import "./header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { LOGO_WIDTH, SCREEN_WIDTH } from "../../Constants/Constant";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import { errorMessage, successMessage } from "../../Utils/Alert";

const Header = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("userData"));
  const navItems = [
    user?.role?.toLowerCase() === "admin" && "Admin",
    "Home",
    "Products",
    "Orders",
    "Cart",
    "My Profile",
    !token ? "sign in" : "sign out",
  ];
  const GENDER = ["Male", "Female", "Others"];
  const [isSmallScreen, setIsSmallScreen] = useState(SCREEN_WIDTH);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [suOpen, setSUOpen] = useState(false);
  const location = useLocation();
  // console.log(location);

  const initialSignInInputs = {
    email: "",
    password: "",
  };
  const initialSignUpInputs = {
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
    gender: "",
  };
  const [signInInputs, setSignInInputs] = useState(initialSignInInputs);
  const [signUpInputs, setSignUpInputs] = useState(initialSignUpInputs);
  const handleHamburger = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (e, item) => {
    e.preventDefault();
    // if (item !== "sign in" && !user) {

    //   localStorage.clear();
    //   window.location.reload();
    //   navigate("/");
    //   return;
    // }
    if (item === "Home") {
      navigate("/");

      return;
    }

    if (item.toLowerCase() === "products") {
      navigate("/products");
      return;
    }

    if (item === "sign in") {
      setOpen(true);
      return;
    }

    if (item === "sign out") {
      localStorage.clear();

      navigate("/");
      window.location.reload();
      return;
    }
    if (token) navigate(`/${item.toLowerCase()}`);

    if (!token && item.toLowerCase() != "products") {
      setOpen(true)
      errorMessage("Acess Denied..! Please Login")
      return
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleChangeSignIn = (e, type) => {
    e.preventDefault();

    if (type === "email") {
      setSignInInputs({ ...signInInputs, email: e.target.value });
      return;
    }
    if (type === "password") {
      setSignInInputs({ ...signInInputs, password: e.target.value });
      return;
    }
  };
  const handleChangeSignUp = (e, type) => {
    e.preventDefault();

    if (type === "email") {
      setSignUpInputs({ ...signUpInputs, email: e.target.value });
      return;
    }
    if (type === "password") {
      setSignUpInputs({ ...signUpInputs, password: e.target.value });
      return;
    }
    if (type === "phoneNumber") {
      setSignUpInputs({ ...signUpInputs, phoneNumber: e.target.value });
      return;
    }
    if (type === "fullName") {
      setSignUpInputs({ ...signUpInputs, name: e.target.value });
      return;
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axiosInstanceV1.post("/signup", signUpInputs);
      if (response.status === 201) {
        successMessage(response.data.message);
        setIsMenuOpen(false);
        clearInputs();
        return;
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      return error;
    }
  };
  const handleSignIn = async () => {
    try {
      const response = await axiosInstanceV1.post("/signin", signInInputs);
      if (response.status === 200) {
        successMessage(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        const user = response.data.user;
        if (user.role.toLowerCase() !== "user") {
          navigate("/admin");
          setIsMenuOpen(false);
          window.location.reload();
          return;
        } else {

          navigate(`${location.pathname}${location.search || ""}`);
          setIsMenuOpen(false);
          window.location.reload();
        }
        clearInputs();
        return;
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      return error;
    }
  };

  const clearInputs = () => {
    setSignInInputs(initialSignInInputs);
    setSignUpInputs(initialSignUpInputs);
    setOpen(false);
    setSUOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(SCREEN_WIDTH);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className={`nav-container ${location.pathname.includes("/admin") && "admin"
        }`}
    >
      <div className="nav-header">
        <h1
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", fontSize: "1.2rem !important" }}
        >
          {/* {!LOGO_WIDTH ? "Instant Delivery Services" : <} */}
          Instant Delivery Services
        </h1>
        <p className="hamburger" onClick={handleHamburger}>
          {isMenuOpen ? (
            <span className={`${isMenuOpen ? "show" : "hide"}`}>
              <IoMdClose size={28} color="white" />
            </span>
          ) : (
            <span className={`${isMenuOpen ? "show" : "hide"}`}>
              <RxHamburgerMenu size={28} color="white" />
            </span>
          )}
        </p>
      </div>
      <div className={`nav-list ${isMenuOpen && "show"}`}>
        {location.pathname.includes("/admin")
          ? navItems
            .filter((item) => ["sign out"].includes(item))
            .map((item, i) => {
              return (
                <li
                  className="list-item"
                  key={i}
                  onClick={(e) => handleNavigate(e, item)}
                >
                  {item}
                </li>
              );
            })
          : navItems.map((item, i) => {
            return (
              <li
                className="list-item"
                key={i}
                onClick={(e) => handleNavigate(e, item)}
              >
                {item}
              </li>
            );
          })}
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
        <h1>Sign In</h1>
        <div className="m-container">
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="email"
              onChange={(e) => handleChangeSignIn(e, "email")}
              value={signInInputs.email}
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="password"
              onChange={(e) => handleChangeSignIn(e, "password")}
              value={signInInputs.password}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="">
          <p className="signupevent">
            Don't have an account?{" "}
            <span
              className="event"
              onClick={() => {
                setSUOpen(true);
                setOpen(false);
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
        <div className="buttons">
          <button
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
            type="button"
            className="close"
          >
            Close
          </button>
          <button type="button" className="submit" onClick={handleSignIn}>
            Submit
          </button>
        </div>
      </Modal>
      <Modal
        open={suOpen}
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
        <h1>Sign Up</h1>
        <div className="m-container signup">
          <div className="input-container">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="fullName"
              onChange={(e) => handleChangeSignUp(e, "fullName")}
              value={signUpInputs.name}
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label htmlFor="phoneNumber"> Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              className="phoneNumber"
              onChange={(e) => handleChangeSignUp(e, "phoneNumber")}
              value={signUpInputs.phoneNumber}
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="email"
              onChange={(e) => handleChangeSignUp(e, "email")}
              value={signUpInputs.email}
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="password"
              onChange={(e) => handleChangeSignUp(e, "password")}
              value={signUpInputs.password}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="item">
          <label htmlFor="">Gender: </label>
          <div className="types">
            {GENDER.map((item, i) => (
              <div className="addressItem" key={i}>
                <input
                  type="radio"
                  id={i}
                  value={item}
                  onChange={(e) =>
                    setSignUpInputs({ ...signUpInputs, gender: e.target.value })
                  }
                  checked={item === signUpInputs.gender}
                // disabled={pF}
                />
                <label style={{ textTransform: "capitalize" }} htmlFor={item}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="" style={{ margin: "10px 0px" }}>
          <p className="signupevent">
            Already have an account?{" "}
            <span
              className="event"
              onClick={() => {
                setSUOpen(false);
                setOpen(true);
              }}
            >
              Sign in
            </span>
          </p>
        </div>
        <div className="buttons">
          <button
            onClick={() => setSUOpen(false)}
            style={{ cursor: "pointer" }}
            type="button"
            className="close"
          >
            Close
          </button>
          <button type="button" className="submit" onClick={handleSignUp}>
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
