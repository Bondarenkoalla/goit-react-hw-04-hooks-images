// import React, { Component } from "react";
import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
const modalRoot = document.querySelector("#modal-root");
const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  const handleKeydown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };
  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return createPortal(
    <div className={styles.Overlay} onClick={handleOverlayClick}>
      <div className={styles.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};
// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeydown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeydown);
//   }

//   handleKeydown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };
//   handleOverlayClick = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };
//   render() {
//     const { src, alt } = this.props;
//     return createPortal(
//       <div className={styles.Overlay} onClick={this.handleOverlayClick}>
//         <div className={styles.Modal}>
//           {" "}
//           <img src={src} alt={alt} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

export default Modal;
