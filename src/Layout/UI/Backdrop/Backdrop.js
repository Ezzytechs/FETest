import React from "react";
import "./Backdrop.scss";
const Backdrop = (props) => {
  return (
    props.open && (
      <div onClick={props.click} className="ModalContainer">
        {props.children}
      </div>
    )
  );
};

export default Backdrop;
