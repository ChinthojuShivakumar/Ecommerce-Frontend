import { useState } from "react";
import styles from "./sidemenu.module.css";

const SideMenu = ({ menu, setMenu }) => {
  const MENU_ITEMS = ["My Profile", "Address"];
  const [activeMenu, setActiveMenu] = useState("");
  const handleMenu = (e, i, item) => {
    e.preventDefault();
    setMenu(i);
    setActiveMenu(item);
    return;
  };
  return (
    <div className={styles.container}>
      {MENU_ITEMS.map((item, i) => {
        return (
          <li
            key={i}
            className={`${styles.listitem} ${
              activeMenu === item && styles.active
            }`}
            onClick={(e) => handleMenu(e, i, item)}
          >
            {item}
          </li>
        );
      })}
    </div>
  );
};

export default SideMenu;
