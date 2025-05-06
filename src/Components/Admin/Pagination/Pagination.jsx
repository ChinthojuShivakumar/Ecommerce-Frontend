import React from "react";
import styles from "./pagination.module.css";

const Pagination = ({ data, totalPages, page, setPage }) => {
  return (
    <div className={styles.paginationcontainer}>
      <button
        type="button"
        className={`${styles.previous} ${data.length == 0 && styles.disable}`}
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
              } ${data.length == 0 && styles.disable}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={`${styles.next} ${data.length == 0 && styles.disable}`}
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
