import styles from "./emptyrecords.module.css";

const EmptyRecords = ({ Page }) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>No {Page} Records Found </p>
    </div>
  );
};

export default EmptyRecords;
