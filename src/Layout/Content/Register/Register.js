import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Personal from "./Personal/Personal";
import Bank from "./Bank/Bank";
import Farm from "./Farm/Farm";
import Success from "./Success/Success";
import farmImage from "../../../assets/images/farm.jpg";
import bankImage from "../../../assets/images/bank.jpg";
import "./Register.scss";
const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userDetails: {},
    bankDetails: {},
    idUpload: {},
    farmDetails: [],
  });

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (section, data) => {
    setFormData({
      ...formData,
      [section]: data,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const bankDetails = {
        accountNumber: formData.accountNumber || "",
        bankName: formData.bankName || "",
      };

      let registrationData = {
        userDetails: {
          ...formData.userDetails,
          hasSmartphone: formData.bankDetails.hasSmartphone,
          hasBankAccount: formData.bankDetails.hasBankAccount,
          profilePic: formData.userDetails.profilePic,
        },
        siteId: formData.userDetails.siteId,
        idUpload: {
          idType: formData.userDetails.idType,
          idNumber: formData.userDetails.idNumber,
          url: formData.userDetails.uploadedFile,
        },
        farmDetails: [...formData.farmDetails],
      };

      if (formData.bankDetails.hasBankAccount === "true") {
        registrationData = { ...registrationData, bankDetails };
      }

      delete registrationData.userDetails.siteId;
      delete registrationData.userDetails.idType;
      delete registrationData.userDetails.idNumber;
      delete registrationData.userDetails.confirmPassword;
      console.log(registrationData);

      // const res = await axios.post(
      //   "https://www.dev.farmwarehouse.ng/api/users/signup",
      //   registrationData
      // );
      setSuccess(true);

      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Personal
            image={farmImage}
            data={formData.userDetails}
            onChange={(data) => handleChange("userDetails", data)}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <Bank
            data={formData.bankDetails}
            onChange={(data) => handleChange("bankDetails", data)}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
            image={bankImage}
          />
        );
      case 3:
        return (
          <Farm
            data={formData.farmDetails}
            onChange={(data) => handleChange("farmDetails", data)}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
            register={handleSubmit}
            loading={loading}
            image={farmImage}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="register">
      <div className="forms">
        {success ? (
          <Success phone={formData.userDetails.credentials} />
        ) : (
          renderStep()
        )}
      </div>
    </div>
  );
};

export default Register;
