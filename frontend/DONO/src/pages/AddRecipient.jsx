import React, { useState } from "react";

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

  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();

    // Use the form input states as needed
    console.log({
      name,
      dob,
      sex,
      phone,
      nextOfKin,
      nextOfKinPhone,
      bloodGroup,
      isDiabetic,
      isHypertensive,
      description,
      organNeeded,
      severity,
      viability,
    });
  };

  return (
    <div className="addrecipient page">
      <div className="form-container form-group">
        <form onSubmit={handleSubmit}>
          <h2 className="form-heading">Add Recipient</h2>
          <h3 className="form-sub-heading">Patient Details</h3>
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
              <option value="Heart">Heart</option>
              <option value="Lungs">Lungs</option>
              <option value="Kidneys">Kidneys</option>
              <option value="Liver">Liver</option>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipient;
