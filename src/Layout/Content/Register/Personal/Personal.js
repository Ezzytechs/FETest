import React, { useState, useEffect } from "react";
import CountryDropdown from "./CountryFlag/CountryFlags";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import Nav from "../Nav/Nav";
import "./Personal.scss";

const Personal = ({ data, onChange, image, onNext }) => {
  const [formData, setFormData] = useState({ ...data });
  const [sites, setSites] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState({ error: false, name: "", message: "" });
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          "https://www.dev.farmwarehouse.ng/api/sites"
        );
        const sites = res.data.data.sites;
        setSites([...sites]);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const requiredFields = [
    "firstName",
    "lastName",
    "credential",
    "ageGroup",
    "gender",
    "resAddress",
    "siteId",
    "idType",
    "idNumber",
    "password",
    "confirmPassword",
  ];
  const checkPasswordRules = (input) => {
    const rule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    setTimeout(() => {
      if (input.length > 0 && !input.match(rule)) {
        setError({
          error: true,
          name: "weakPass",
          message: "Password too weak!",
        });
      } else {
        setError({
          error: false,
        });
      }
    }, 1000);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "password" && value.length > 0) {
      checkPasswordRules(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileInputName = e.target.name;
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fileInputName]: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError({
        error: true,
        name: "password",
        message: "Password does not match",
      });
    }
    onChange({ ...formData, roleName: "farmer" });
    onNext();
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const isValid = requiredFields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );
    setIsFormValid(isValid);
  };

  const siteList = sites.map((site) => (
    <option key={site._id} value={site._id}>
      {site.communityName}
    </option>
  ));

  return (
    <div className="personal-page">
      <div className="left-section">
        <img src={image} alt="Farm Warehouse" />
      </div>

      <div className="right-section">
        <div className="form">
          <Nav />
          <h4>Personal Details</h4>
          <form className="user-info-form" onSubmit={handleSubmit}>
            <div className="sameGroup">
              <div className="form-group">
                <label>First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <label>Phone Number*</label>
            <div className="PhoneGroup">
              <div className="form-group">
                <CountryDropdown />
              </div>
              <div className="tel">
                <input
                  type="tel"
                  name="credential"
                  placeholder="+234 000 0000 000"
                  value={formData.credential}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email address (Optional)</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="sameGroup">
              <div className="form-group">
                <label>Age*</label>
                <select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select age</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                </select>
              </div>

              <div className="form-group">
                <label>Choose Gender*</label>
                <div className="gender-group">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleInputChange}
                      required
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleInputChange}
                      required
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Residential Address*</label>
              <input
                type="text"
                name="resAddress"
                placeholder="Enter your address"
                value={formData.resAddress}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Site*</label>
              <select
                name="siteId"
                value={formData.site}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Site</option>
                {siteList}
              </select>
            </div>

            <div className="form-group">
              <label>ID Type*</label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select ID Type</option>
                <option value="nin">NIN</option>
                <option value="bvn">BVN</option>
                <option value="driverLicense">Driver License</option>
              </select>
            </div>

            <div className="form-group">
              <label>ID Number*</label>
              <input
                type="text"
                name="idNumber"
                placeholder="Enter your ID number"
                value={formData.idNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload ID Document*</label>
              <input
                type="file"
                name="uploadedFile"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Create Password*</label>
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleInputChange}
                className={
                  error && error.name === "weakPass" ? "weak-pass" : ""
                }
                required
              />
              <h6 className="error">
                {error && error.name === "weakPass" && error.message}
              </h6>
            </div>

            <div className="form-group">
              <label>Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={
                  error && error.name === "password" ? "weak-pass" : ""
                }
                required
              />
              <h6 className="error">
                {error.name === "password" && error.message}
              </h6>
              <div
                className={
                  error && error.name === "weakPass" ? "highlightText" : "text"
                }
              >
                <h5>Password must be at least 8 characters</h5>
                <h5>Must contain one special character</h5>
              </div>
            </div>

            <div className="form-group">
              <label>Upload Profile Picture (Optional)</label>
              <div className="profile">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="profile-preview"
                  />
                ) : (
                  <FaUser className="user" size={40} />
                )}
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="back-button">
                Back
              </button>
              <button
                disabled={!isFormValid}
                type="submit"
                className="submit-button"
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

export default Personal;
