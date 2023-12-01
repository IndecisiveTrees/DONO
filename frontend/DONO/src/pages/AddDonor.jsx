import React, { useState } from "react";
import { apiUrl, hospitalID } from "../globals";
import axios from "axios";

const AddDonor = () => {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [phone, setPhone] = useState("");
  const [nextOfKin, setNextOfKin] = useState("");
  const [nextOfKinPhone, setNextOfKinPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [isDiabetic, setIsDiabetic] = useState(false);
  const [isHypertensive, setIsHypertensive] = useState(false);
  const [deceased, setDeceased] = useState(false);
  const [heartDonor, setHeartDonor] = useState(false);
  const [lungDonor, setLungDonor] = useState(false);
  const [kidneyDonor, setKidneyDonor] = useState(false);
  const [liverDonor, setLiverDonor] = useState(false);
  const [heartDescription, setHeartDescription] = useState("");
  const [lungDescription, setLungDescription] = useState("");
  const [kidneyDescription, setKidneyDescription] = useState("");
  const [liverDescription, setLiverDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    let antigen = "";
    let rh = false;
    let success = false;
    if (name == "") {
      setErrorMessage("Name is required");
      return;
    }
    if (dob == "") {
      setErrorMessage("Date of birth is required");
      return;
    } else if (dob > new Date().toISOString().split("T")[0]) {
      setErrorMessage("Date of birth cannot be in the future");
      return;
    }
    if (sex == "") {
      setSex("Sex is mandatory");
      return;
    }
    if (phone == "") {
      setPhone("Phone is mandatory");
      return;
    }
    if (bloodGroup == "") {
      setBloodGroup("Blood group is mandatory");
      return;
    } else {
      if (bloodGroup.slice(-1) === "+") {
        rh = true;
      } else {
        rh = false;
      }
      switch (bloodGroup.slice(0, 1)) {
        case "A":
          antigen = "A";
          break;
        case "B":
          antigen = "B";
          break;
        case "O":
          antigen = "O";
          break;
        case "AB":
          antigen = "AB";
          break;
      }
    }
    let diabetic = isDiabetic ? "TYPE1" : "NAN";
    if (!(heartDonor || liverDonor || lungDonor || kidneyDonor)) {
      setErrorMessage("At least one organ is required");
      return;
    }

    let donorData = {
      name: name,
      dob: dob,
      sex: sex,
      phoneNumber: phone,
      nextOfKin: nextOfKin,
      nextOfKinPhone: nextOfKinPhone,
      antigen: antigen,
      rh: rh,
      diabetes: diabetic,
      hypertensive: isHypertensive,
      description: "",
      hospitalId: hospitalID,
      deceased: deceased,
    };

    axios.post(apiUrl + "/matcher/donor", donorData).then((res) => {
      let donorId = res.data;
      let organData = {
        donorId: 0,
        hospitalId: hospitalID,
        organType: "string",
        organStatus: "BODY",
        description: "string",
      };
      setSuccessMessage("Donor added successfully");
      setName("");
      setDob("");
      setSex("");
      setPhone("");
      setNextOfKin("");
      setNextOfKinPhone("");
      setBloodGroup("");
      setIsDiabetic(false);
      setIsHypertensive(false);
      setDeceased(false);
      setHeartDonor(false);
      setLungDonor(false);
      setKidneyDonor(false);
      setLiverDonor(false);
      setHeartDescription("");
      setLungDescription("");
      setKidneyDescription("");
      setLiverDescription("");
      setErrorMessage("");
      if (heartDonor) {
        organData.donorId = donorId;
        organData.organType = "HEART";
        organData.organStatus = "BODY";
        organData.description = heartDescription;
        console.log(organData);
        axios
          .post(apiUrl + "/matcher/organ", organData)
          .then((res) => {
            success = true;
          })
          .catch((res) => {
            console.log(res);
          });
      }
      if (lungDonor) {
        organData.donorId = donorId;
        organData.organType = "LUNG";
        organData.organStatus = "BODY";
        organData.description = lungDescription;
        axios
          .post(apiUrl + "/matcher/organ", organData)
          .then((res) => {
            success = true;
          })
          .catch((res) => {
            console.log(res);
          });
      }
      if (kidneyDonor) {
        organData.donorId = donorId;
        organData.organType = "KIDNEY";
        organData.organStatus = "BODY";
        organData.description = kidneyDescription;
        axios
          .post(apiUrl + "/matcher/organ", organData)
          .then((res) => {
            success = true;
          })
          .catch((res) => {
            console.log(res);
          });
      }
      if (liverDonor) {
        organData.donorId = donorId;
        organData.organType = "LIVER";
        organData.organStatus = "BODY";
        organData.description = liverDescription;
        axios
          .post(apiUrl + "/matcher/organ", organData)
          .then((res) => {
            success = true;
          })
          .catch((res) => {
            console.log(res);
          });
      }
    });
  };

  return (
    <div className="adddonor page">
      <div className="form-container form-group">
        <form onSubmit={handleSubmit}>
          <h2 className="form-heading">Add Donor</h2>
          <h3 className="form-sub-heading">Donor Details</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="mb-3">
            <label htmlFor="donor-name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="donor-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="donor-dob" className="form-label">
              Date Of Birth
            </label>
            <input
              type="date"
              className="form-date"
              id="donor-dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="donor-sex" className="form-label">
              Sex
            </label>
            <select
              className="form-select"
              id="donor-sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Others</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="donor-phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="donor-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="donor-next-of-kin" className="form-label">
              Next of Kin
            </label>
            <input
              type="text"
              className="form-control"
              id="donor-next-of-kin"
              value={nextOfKin}
              onChange={(e) => setNextOfKin(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="donor-next-of-kin-phone" className="form-label">
              Next of Kin Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="donor-next-of-kin-phone"
              value={nextOfKinPhone}
              onChange={(e) => setNextOfKinPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="donor-blood-group" className="form-label">
              Blood Group
            </label>
            <select
              className="form-select"
              id="donor-blood-group"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="mb-3 d-flex">
            <input
              type="checkbox"
              id="donor-diabetic"
              className="form-check-input m-1"
              checked={isDiabetic}
              onChange={(e) => setIsDiabetic(e.target.checked)}
            />
            <label
              htmlFor="donor-diabetic"
              className="form-check-label flex-fill"
            >
              Diabetic
            </label>
            <input
              type="checkbox"
              id="donor-hypertensive"
              className="form-check-input m-1"
              checked={isHypertensive}
              onChange={(e) => setIsHypertensive(e.target.checked)}
            />
            <label
              htmlFor="donor-hypertensive"
              className="form-check-label flex-fill"
            >
              Hypertensive
            </label>
          </div>

          <div className="mb-3">
            <input
              type="checkbox"
              id="donor-deceased"
              className="form-check-input m-1"
              checked={deceased}
              onChange={(e) => setDeceased(e.target.checked)}
            />
            <label
              htmlFor="donor-deceased"
              className="form-check-label flex-fill"
            >
              Deceased
            </label>
          </div>

          <h3 className="form-sub-heading">Organ Details</h3>

          <div className="mb-3">
            <label htmlFor="donor-heart" className="form-label">
              Heart Donor
            </label>
            <input
              type="checkbox"
              id="donor-heart"
              className="form-check-input m-1"
              checked={heartDonor}
              onChange={(e) => setHeartDonor(e.target.checked)}
            />
            {heartDonor && (
              <textarea
                className="form-control"
                id="donor-heart-description"
                rows="3"
                placeholder="Heart Description"
                value={heartDescription}
                onChange={(e) => setHeartDescription(e.target.value)}
              ></textarea>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="donor-lung" className="form-label">
              Lung Donor
            </label>
            <input
              type="checkbox"
              id="donor-lung"
              className="form-check-input m-1"
              checked={lungDonor}
              onChange={(e) => setLungDonor(e.target.checked)}
            />
            {lungDonor && (
              <textarea
                className="form-control"
                id="donor-lung-description"
                rows="3"
                placeholder="Lung Description"
                value={lungDescription}
                onChange={(e) => setLungDescription(e.target.value)}
              ></textarea>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="donor-kidney" className="form-label">
              Kidney Donor
            </label>
            <input
              type="checkbox"
              id="donor-kidney"
              className="form-check-input m-1"
              checked={kidneyDonor}
              onChange={(e) => setKidneyDonor(e.target.checked)}
            />
            {kidneyDonor && (
              <textarea
                className="form-control"
                id="donor-kidney-description"
                rows="3"
                placeholder="Kidney Description"
                value={kidneyDescription}
                onChange={(e) => setKidneyDescription(e.target.value)}
              ></textarea>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="donor-liver" className="form-label">
              Liver Donor
            </label>
            <input
              type="checkbox"
              id="donor-liver"
              className="form-check-input m-1"
              checked={liverDonor}
              onChange={(e) => setLiverDonor(e.target.checked)}
            />
            {liverDonor && (
              <textarea
                className="form-control"
                id="donor-liver-description"
                rows="3"
                placeholder="Liver Description"
                value={liverDescription}
                onChange={(e) => setLiverDescription(e.target.value)}
              ></textarea>
            )}
          </div>
          {successMessage && <h4 className="text-success">{successMessage}</h4>}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonor;
