import React, { useState } from "react";
import axios from "axios";
import Modal from "../../../UI/Modal/Modal";
import Spinner from "../../../UI/Spinner/Spinner";
import "./Success.scss";
const Success = (props) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { value } = e.target;
    setCode(value);
  };
  const handleSubmit = async () => {
    console.log("Submitting");

    const verifyData = {
      code: code,
      credential: props.phone,
    };
    setLoading(true);
    setError(false);
    try {
      const res = await axios.post(
        "https://www.dev.farmwarehouse.ng/api/users/verify_account",
        verifyData
      );
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <Modal show={true}>
      <div className="Success">
        <h2>Account Craeted!</h2>
        <h4>Verify your Credentails</h4>
        <form className="Form" onSubmit={handleSubmit}>
          <h6 className="Info">Enter the code sent to your phone</h6>
          <input
            type="text"
            name="code"
            value={code}
            onChange={handleInputChange}
            required
          />
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          // className={classes.Verify}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Verify"}
        </button>
      </div>
    </Modal>
  );
};

export default Success;
