import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.scss";
const FeedBack = (props) => {
  const toggleClass = ["FeedBackContainer", props.show ? "Show" : "Hide"].join(
    " "
  );
  return (
    <>
      <Backdrop open={props.show} />
      <div className={toggleClass}>
        <div className="FeedBackInfo">{props.children}</div>
      </div>
    </>
  );
};

export default FeedBack;
