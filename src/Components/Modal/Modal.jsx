import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./model.module.css";

const Modal = ({
  open,
  setOpen,
  onClose,
  children,
  mouseEvents = false,
  style,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [open]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modalBackdrop}></div>
      <div
        className={styles.modalContent}
        onMouseEnter={mouseEvents ? () => setOpen(true) : null}
        onMouseLeave={mouseEvents ? () => setOpen(false) : null}
        style={style}
      >
        <div className={styles.modalClosebtn}>
          {/* <button onClick={onClose}>&times;</button> */}
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
