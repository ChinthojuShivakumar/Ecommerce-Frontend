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
    cursor: "pointer",
  };
  return (
    <div className={styles.searchContainer}>
      {/* <p className={styles.leftSearch}>
        <FiSearch size={28} style={leftSearch}  />
      </p> */}
      <div className={`${styles.inputContainer} ${styles.px}`}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for orders"
          className={styles.searchInput}
        />
      </div>
      {/* <p className={styles.rightSearch}>
        <FiSearch
          size={28}
          style={rightSearch}
          
        />
      </p> */}
    </div>
  );
};

export default Search;
