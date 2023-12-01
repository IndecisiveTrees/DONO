import React, { useState } from "react";
import axios from "axios";
import { apiUrl, hospitalID } from "../globals";

const AddRecipient = () => {
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
  const [description, setDescription] = useState("");
  const [organNeeded, setOrganNeeded] = useState("");
  const [severity, setSeverity] = useState("");
  const [viability, setViability] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let antigen = "";
    let rh = false;
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
    const deceased = false;
    if (organNeeded == "") {
      setErrorMessage("Organ needed is mandatory");
    }
    if (severity == "") {
      setErrorMessage("Severity is mandatory");
    }
    if (viability == "") {
      setErrorMessage("Viability is mandatory");
    }
    let data = {
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
      description: description,
      hospitalId: hospitalID,
      deceased: deceased,
      organNeeded: organNeeded,
      severity: severity,
      viability: viability,
    };
    // console.log(data);
    axios
      .post(apiUrl + "/matcher/recipient", data)
      .then((res) => {
        setSuccessMessage("Recipient added successfully");
        setName("");
        setDob("");
        setSex("");
        setPhone("");
        setNextOfKin("");
        setNextOfKinPhone("");
        setBloodGroup("");
        setIsDiabetic(false);
        setIsHypertensive(false);
        setDescription("");
        setOrganNeeded("");
        setSeverity("");
        setViability("");
      })
      .catch((res) => {
        console.log(res);
        setErrorMessage("Error adding recipient");
      });
  };

  return (
    <div className="addrecipient page">
      <div className="form-container form-group">
        <form onSubmit={handleSubmit}>
          <h2 className="form-heading">Add Recipient</h2>
          <h3 className="form-sub-heading">Patient Details</h3>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <div className="mb-3">
            <label htmlFor="recipient-name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="recipient-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-dob" className="form-label">
              Date Of Birth
            </label>
            <input
              type="date"
              className="form-date"
              id="recipient-dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-sex" className="form-label">
              Sex
            </label>
            <select
              className="form-select"
              id="recipient-sex"
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
            <label htmlFor="recipient-phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="recipient-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-next-of-kin" className="form-label">
              Next of Kin
            </label>
            <input
              type="text"
              className="form-control"
              id="recipient-next-of-kin"
              value={nextOfKin}
              onChange={(e) => setNextOfKin(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-next-of-kin-phone" className="form-label">
              Next of Kin Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="recipient-next-of-kin-phone"
              value={nextOfKinPhone}
              onChange={(e) => setNextOfKinPhone(e.target.value)}
            />
          </div>
          <h3 className="form-sub-heading">Medical Details</h3>
          <div className="mb-3">
            <label htmlFor="recipient-blood-group" className="form-label">
              Blood Group
            </label>
            <select
              className="form-select"
              id="recipient-blood-group"
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
              id="recipient-diabetic"
              className="form-check-input m-1"
              checked={isDiabetic}
              onChange={(e) => setIsDiabetic(e.target.checked)}
            />
            <label
              htmlFor="recipient-diabetic"
              className="form-check-label flex-fill"
            >
              Diabetic
            </label>
            <input
              type="checkbox"
              id="recipient-hypertensive"
              className="form-check-input m-1"
              checked={isHypertensive}
              onChange={(e) => setIsHypertensive(e.target.checked)}
            />
            <label
              htmlFor="recipient-hypertensive"
              className="form-check-label flex-fill"
            >
              Hypertensive
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="recipient-organ-needed" className="form-label">
              Organ Needed
            </label>
            <select
              className="form-select"
              id="recipient-organ-needed"
              value={organNeeded}
              onChange={(e) => setOrganNeeded(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="HEART">Heart</option>
              <option value="LUNG">Lung</option>
              <option value="KIDNEY">Kidney</option>
              <option value="LIVER">Liver</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-severity" className="form-label">
              Severity
            </label>
            <select
              className="form-select"
              id="recipient-severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-viability" className="form-label">
              Viability
            </label>
            <select
              className="form-select"
              id="recipient-viability"
              value={viability}
              onChange={(e) => setViability(e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="recipient-description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="recipient-description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          {successMessage && (
            <h4 className="text-success textcenter">{successMessage}</h4>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipient;
