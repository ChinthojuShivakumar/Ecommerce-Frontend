import React, { useEffect, useState } from "react";
import "./header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { LOGO_WIDTH, SCREEN_WIDTH } from "../../Constants/Constant";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

const Header = () => {
  const navItems = [
    "Admin",
    "Home",
    "Products",
    "Orders",
    "Cart",
    "My Profile",
    "sign in",
    "sign out",
  ];
  const [isSmallScreen, setIsSmallScreen] = useState(SCREEN_WIDTH);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [suOpen, setSUOpen] = useState(false);

  const handleHamburger = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (e, item) => {
    e.preventDefault();
    if (item === "Home") {
      navigate("/");
      return;
    }

    if (item === "sign in") {
      setOpen(true);
      return;
    }

    if (item === "sign out") {
      setSUOpen(true);
      return;
    }

    navigate(`/${item.toLowerCase()}`);
  };

  const handleCloseModal = () => {
    // e.preventDefault();
    setOpen(false);
    // return;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(SCREEN_WIDTH);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="nav-container">
      <div className="nav-header">
        <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          {!LOGO_WIDTH ? "Instant Delivery Services" : "IDS"}
        </h1>
        <p className="hamburger" onClick={handleHamburger}>
          {isMenuOpen ? (
            <span className={`${!isMenuOpen ? "show" : "hide"}`}>
              <IoMdClose size={28} />
            </span>
          ) : (
            <span className={`${isMenuOpen ? "show" : "hide"}`}>
              <RxHamburgerMenu size={28} />
            </span>
          )}
        </p>
      </div>
      <div className={`nav-list ${isMenuOpen && "show"}`}>
        {navItems.map((item, i) => {
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
            <input type="email" id="email" name="email" className="email" />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="password"
            />
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
            type="button"
            className="close"
          >
            Close Modal
          </button>
          <button type="button" className="submit">
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
            />
          </div>
          <div className="input-container">
            <label htmlFor="phoneNumber"> Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              className="phoneNumber"
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="email" />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="password"
            />
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => setSUOpen(false)}
            style={{ cursor: "pointer" }}
            type="button"
            className="close"
          >
            Close Modal
          </button>
          <button type="button" className="submit">
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
