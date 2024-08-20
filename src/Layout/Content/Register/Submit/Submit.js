import React from "react";
import Modal from "../../../UI/Modal/Modal";
import Spinner from "../../../UI/Spinner/Spinner";
import "./Submit.scss";
const Submit = (props) => {
  return (
    <Modal show={props.show}>
      <h2>You have added 1 farm</h2>
      <h4>Would you like to add another?</h4>
      <br />
      <div className="ButtonDiv">
        <button
          className="Next"
          onClick={props.register}
          disabled={props.loading}
        >
          {props.loading ? <Spinner /> : "No, create my account"}
        </button>
        <button onClick={props.close}>Yes I have another farm</button>
      </div>
    </Modal>
  );
};

export default Submit;
