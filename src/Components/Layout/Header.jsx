import React, { useEffect, useState } from "react";
import "./header.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { SCREEN_WIDTH } from "../../Constants/Constant";

const Header = () => {
  const navItems = ["Home", "Products", "Orders", "Cart", "My Profile"];
  const [isSmallScreen, setIsSmallScreen] = useState(SCREEN_WIDTH);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburger = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
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
        <h1>Instant Delivery</h1>
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
            <li className="list-item" key={i}>
              {item}
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
