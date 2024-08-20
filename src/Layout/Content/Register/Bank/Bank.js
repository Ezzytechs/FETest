import React, { useState, useEffect } from "react";
import { banks } from "./Banks";
import "./Bank.scss";
import Nav from "../Nav/Nav";

const Bank = ({ data, onChange, onNext, image, onPrev }) => {
  const [bank, setBank] = useState({ ...data });
  const [isFormValid, setIsFormValid] = useState(false);
  const requiredFields = ["hasBankAccount", "hasSmartphone"];

  useEffect(() => {
    // Validate the form whenever bank state changes
    validateForm();
  }, [bank]);

  const validateForm = () => {
    const isValid = requiredFields.every((field) => {
      return bank[field] !== undefined && bank[field].trim() !== "";
    });
    setIsFormValid(isValid);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBank({
      ...bank,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset bank fields if "No" is selected for hasBankAccount
    if (bank.hasBankAccount === "No") {
      setBank((prevState) => ({
        ...prevState,
        bankName: "",
        accountNumber: "",
      }));
    }
    onChange(bank);
    onNext();
  };

  const bankList = banks.map((bank) => {
    return (
      <option key={bank.id} value={bank.name}>
        {bank.name}
      </option>
    );
  });

  return (
    <div className="bank-container">
      {/* Left panel: Image */}
      <div className="image-panel">
        <img src={image} alt="Bank illustration" />
      </div>

      {/* Right panel: Form */}
      <div className="form-panel">
        <div>
          <Nav />
          <h4>Bank Details</h4>
          <form className="bank-details-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Do you have a Smartphone?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="hasSmartphone"
                    value="true"
                    checked={bank.hasSmartphone === "true"}
                    onChange={handleInputChange}
                    required
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasSmartphone"
                    value="false"
                    checked={bank.hasSmartphone === "false"}
                    onChange={handleInputChange}
                    required
                  />
                  No
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Do you have a Bank Account?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="hasBankAccount"
                    value="true"
                    checked={bank.hasBankAccount === "true"}
                    onChange={handleInputChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasBankAccount"
                    value="false"
                    checked={bank.hasBankAccount === "false"}
                    onChange={handleInputChange}
                  />
                  No
                </label>
              </div>
            </div>

            {bank.hasBankAccount === "true" && (
              <div className="bank-info">
                <div className="form-group">
                  <label>Bank*</label>
                  <select
                    name="bankName"
                    value={bank.bankName}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Bank</option>
                    {bankList}
                  </select>
                </div>
                <div className="form-group">
                  <label>Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter Account Number"
                    value={bank.accountNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="button" onClick={onPrev} className="back-button">
                Back
              </button>
              <button
                disabled={!isFormValid}
                type="submit"
                className={!isFormValid ? "noSubmit" : "submit-button"}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Bank;
