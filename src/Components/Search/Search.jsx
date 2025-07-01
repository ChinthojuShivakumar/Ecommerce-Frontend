import React from "react";
import styles from "./search.module.css";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const leftSearch = {
    padding: "0.3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "5%",
    borderRight: "1px solid black",
  };
  const rightSearch = {
    padding: "0.3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "5%",
    borderLeft: "1px solid black",
    cursor:'pointer'
  };
  return (
    <div className={styles.searchContainer}>
      <FiSearch size={28} style={leftSearch} />
      <div className={`${styles.inputContainer} ${styles.px}`}>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search for orders"
          className={styles.searchInput}
        />
      </div>
      <FiSearch size={28} style={rightSearch} />
    </div>
  );
};

export default Search;
