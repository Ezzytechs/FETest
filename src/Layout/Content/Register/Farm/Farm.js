import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import Submit from "../Submit/Submit";
import { months } from "./data";
import axios from "axios";
import "./Farm.scss";

const FarmRegistration = ({
  onChange,
  data,
  image,
  register,
  loading,
  onPrev,
}) => {
  const [crops, setCrops] = useState([]);
  const [formData, setFormData] = useState({
    ...data,
    crops: [],
    docUploads: [{ url: "https://" }],
  });
  const [newCrop, setNewCrop] = useState({
    cropId: "",
    farmSeasonStart: "",
    farmSeasonEnd: "",
  });

  const [farmList, setFarmList] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          "https://www.dev.farmwarehouse.ng/api/crops"
        );
        const crops = res.data.data.crops;
        setCrops([...crops]);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCropChange = (e) => {
    const { name, value } = e.target;
    setNewCrop({
      ...newCrop,
      [name]: value,
    });
  };

  const addCrop = () => {
    const { cropId, farmSeasonStart, farmSeasonEnd } = newCrop;

    if (cropId && farmSeasonStart && farmSeasonEnd) {
      setFormData((prevState) => ({
        ...prevState,
        crops: [...prevState.crops, newCrop],
      }));

      setNewCrop({ cropId: "", farmSeasonStart: "", farmSeasonEnd: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.crops = [...formData.crops, newCrop];

    const farmListData = [...farmList, formData];

    onChange(farmListData);
    setSuccess(true);
  };

  const closeFeedBack = () => {
    const allFarms = new Set([...farmList, formData]);
    setFarmList([...allFarms]);

    setFormData({
      name: "",
      address: "",
      crops: [],
    });
    setNewCrop({ cropId: "", farmSeasonStart: "", farmSeasonEnd: "" });
    setSuccess(false);
  };

  useEffect(() => {
    const { name, address } = formData;

    const isNewCropComplete =
      newCrop.cropId && newCrop.farmSeasonStart && newCrop.farmSeasonEnd;

    const isValid = name && address && isNewCropComplete ? true : false;

    setIsFormValid(isValid);
  }, [newCrop, formData]);
  const removeItem = (id) => {
    const currentCrops = [...formData.crops].filter(
      (crop) => crop.cropId !== id
    );
    setFormData({
      ...formData,
      crops: currentCrops,
    });
  };
  const monthList = months.map((month) => (
    <option key={month} value={month}>
      {month}
    </option>
  ));

  const cropsList = crops.map((crop) => (
    <option key={crop._id} value={crop._id}>
      {crop.name}
    </option>
  ));

  return (
    <>
      {success && (
        <Submit
          show={success}
          loading={loading}
          close={closeFeedBack}
          register={register}
        />
      )}

      <div className="farm-container">
        <div className="image-panel">
          <img src={image} alt="Farm illustration" />
        </div>
        <div className="form-panel">
          <div className="form">
            <Nav />
            <h4>Farm Details</h4>
            <form className="farm-details-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="farmName">Farm Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter farm name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="farmAdrress">Farm Address*</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter farm Address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Farm Coordinates (Optional)</label>
                <div className="coordinates">
                  <input
                    type="text"
                    id="longitude"
                    name="long"
                    value={formData.long}
                    onChange={handleInputChange}
                    placeholder="Longitude"
                  />
                  <input
                    type="text"
                    id="latitude"
                    name="lat"
                    value={formData.lat}
                    onChange={handleInputChange}
                    placeholder="Latitude"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="crop">
                  Crops cultivated and planting season
                </label>
                <select
                  name="cropId"
                  id="crop"
                  value={newCrop.cropId}
                  onChange={handleCropChange}
                  required
                >
                  <option value="">Select crop</option>
                  {cropsList}
                </select>

                <select
                  name="farmSeasonStart"
                  value={newCrop.farmSeasonStart}
                  onChange={handleCropChange}
                >
                  <option value="">Start month</option>
                  {monthList}
                </select>

                <select
                  name="farmSeasonEnd"
                  value={newCrop.farmSeasonEnd}
                  onChange={handleCropChange}
                >
                  <option value="">End month</option>
                  {monthList}
                </select>

                <button type="button" className="crop-button" onClick={addCrop}>
                  Add another crop
                </button>
              </div>

              {formData.crops.length > 0 && (
                <div className="crop-list">
                  <h3>Added Crops:</h3>
                  <ul>
                    {formData.crops.map((crop, index) => {
                      const item = crops.find(
                        (item) => item._id === crop.cropId
                      );
                      return (
                        <li key={index} onClick={() => removeItem(crop.cropId)}>
                          {`${item.name} (Start: ${crop.farmSeasonStart}, End: ${crop.farmSeasonEnd})`}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="farmDocuments">Upload farm documents</label>
                <input type="file" id="farmDocuments" />
              </div>

              <div className="form-actions">
                <button type="button" onClick={onPrev} className="back-button">
                  Back
                </button>
                <button
                  type="submit"
                  className={!isFormValid ? "noSubmit" : "submit-button"}
                  disabled={!isFormValid}
                >
                  Create Farm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FarmRegistration;
