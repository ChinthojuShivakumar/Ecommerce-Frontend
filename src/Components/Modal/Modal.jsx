import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

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
    <div className="modal-container">
      <div className="modal-backdrop"></div>
      <div
        className="modal-content"
        onMouseEnter={mouseEvents ? () => setOpen(true) : null}
        onMouseLeave={mouseEvents ? () => setOpen(false) : null}
        style={style}
      >
        <div className="modal-close-btn">
          {/* <button onClick={onClose}>&times;</button> */}
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
