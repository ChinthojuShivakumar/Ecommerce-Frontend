import React from "react";
import styles from "./textfield.module.css";

const TextField = ({
  label,
  name,
  id,
  onChange,
  type,
  className,
  htmlFor,
  required,
  style,
}) => {
  const TYPES = ["radio", "checkbox"];
  if (TYPES.includes(type)) return;
  return (
    <div className={styles.inputGroup} style={style}>
      <input
        id={id}
        className={styles.input}
        type={type}
        required={required}
        name={name}
        onChange={onChange}
        // style={{  }}
        max={type == "number" && 10}
      />
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
    </div>
  );
};

export default TextField;
