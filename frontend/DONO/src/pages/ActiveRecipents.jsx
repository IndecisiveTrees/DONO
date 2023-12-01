import { React, useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl, hospitalID } from "../globals";

const RecipientTable = ({}) => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [filterOrgan, setFilterOrgan] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [editedFields, setEditedFields] = useState({
    viability: "",
    severity: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiUrl + "/matcher/hospital/" + hospitalID + "/recipients")
      .then((response) => {
        setLoadingMessage("");
        let resData = response.data;

        setData(resData.filter((recipient) => recipient.organNeeded != "NAN"));
      })
      .catch((error) => {
        setErrorMessage("Error fetching recipients");
        console.log(error);
      });
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const openEditModal = (recipient) => {
    setSelectedRecipient(recipient);
    setEditedFields({
      viability: recipient.viability,
      severity: recipient.severity,
      description: recipient.medicalRecord.description,
    });
    setModalIsOpen(true);
  };

  const closeEditModal = () => {
    setModalIsOpen(false);
  };

  const handleSaveChanges = () => {
    // Update the recipient with the edited fields
    if (selectedRecipient) {
      axios
        .put(
          apiUrl + "/matcher/recipient/" + selectedRecipient.id + "/details",
          editedFields
        )
        .then((response) => {
          console.log("updated successfully");
        })
        .catch((response) => {
          console.log(response);
        });
    }

    // Close the modal
    closeEditModal();
  };

  const handleRemove = (recipientId) => {
    // Handle remove logic here
    axios
      .delete(apiUrl + "/matcher/recipient/" + recipientId)
      .then((response) => {
        console.log("removed successfully");
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const handleFilterOrgan = (event) => {
    setFilterOrgan(event.target.value);
  };

  const filteredData = data.filter((recipient) =>
    filterOrgan ? recipient.organNeeded === filterOrgan : true
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else if (sortConfig.direction === "desc") {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
    return 0;
  });

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="page">
      <h2 className="text-center">Patient Waitlist</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <button
        className="btn btn-primary flex-fill"
        onClick={() => {
          navigate("/hospital/add-recipient");
        }}
      >
        Add Recipient
      </button>
      <div className="filter mb-3 flex-fill">
        <label htmlFor="organFilter">Filter by Organ:</label>
        <select
          className="form-select"
          id="organFilter"
          onChange={handleFilterOrgan}
          value={filterOrgan}
        >
          <option value="">All</option>
          <option value="HEART">Heart</option>
          <option value="KIDNEY">Kidney</option>
          <option value="LIVER">Liver</option>
          <option value="LUNG">Lung</option>
        </select>
      </div>
      {loadingMessage && <h4 className="text-center">{loadingMessage}</h4>}
      <div className="table-container">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("dob")}>Age</th>
              <th onClick={() => handleSort("organNeeded")}>Organ Needed</th>
              <th onClick={() => handleSort("severity")}>Severity</th>
              <th onClick={() => handleSort("viability")}>Viability</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((recipient) => (
              <tr key={recipient.id}>
                <td>{recipient.name}</td>
                <td>{calculateAge(recipient.dob)}</td>
                <td>{recipient.organNeeded}</td>
                <td>{recipient.severity}</td>
                <td>{recipient.viability}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => openEditModal(recipient)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(recipient.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Recipient Modal"
        ariaHideApp={false}
      >
        <h2>Edit Recipient</h2>
        <label className="form-label" htmlFor="edit-viability">
          Viability:
        </label>
        <select
          className="form-select"
          value={editedFields.viability}
          onChange={(e) =>
            setEditedFields({ ...editedFields, viability: e.target.value })
          }
          id="edit-viability"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <label className="form-label" htmlFor="edit-severity">
          Severity:
        </label>
        <select
          className="form-select"
          value={editedFields.severity}
          onChange={(e) =>
            setEditedFields({ ...editedFields, severity: e.target.value })
          }
          id="edit-severity"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <label className="form-label" htmlFor="edit-description">
          Description:
        </label>
        <textarea
          className="form-control"
          rows={3}
          value={editedFields.description}
          id="edit-description"
          onChange={(e) =>
            setEditedFields({ ...editedFields, description: e.target.value })
          }
        />
        <br />
        <div className="buttons d-flex">
          <button className="flex-fill m-2" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button className="flex-fill m-2" onClick={closeEditModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

const ActiveRecipents = () => {
  return <RecipientTable />;
};

export default ActiveRecipents;
