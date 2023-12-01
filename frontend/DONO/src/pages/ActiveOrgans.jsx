import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { apiUrl, hospitalID } from "../globals";

const OrganTable = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [editedFields, setEditedFields] = useState({
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiUrl + "/matcher/hospital/" + hospitalID + "/organs")
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const openEditModal = (organ) => {
    setSelectedOrgan(organ);
    setEditedFields({
      description: organ.description,
    });
    setModalIsOpen(true);
  };

  const closeEditModal = () => {
    setModalIsOpen(false);
  };

  const handleSaveChanges = () => {
    // Update the organ with the edited fields
    if (selectedOrgan) {
      // Here you would typically update your data source or make an API call
      console.log(
        `Updating organ ${selectedOrgan.donor.id} with edited fields`,
        editedFields
      );
    }

    // Close the modal
    closeEditModal();
  };

  const handleRemove = (organId) => {
    axios
      .delete(apiUrl + "/matcher/organ/" + organId)
      .then((res) => {
        console.log("target has been neutralized");
      })
      .catch((res) => {
        console.log("Error: skill issue");
      });
  };

  const calculateHoursSinceCreation = (creationTime) => {
    const now = new Date();
    const diffInMilliseconds = now - new Date(creationTime);
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return Math.round(diffInHours);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else if (sortConfig.direction === "desc") {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="page">
      <h2 className="text-center">Active Organs</h2>
      <button
        className="btn btn-primary flex-fill mb-3"
        onClick={() => {
          navigate("/hospital/add-donor");
        }}
      >
        Add Organ
      </button>
      <div className="table-container">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th onClick={() => handleSort("organType")}>Organ Type</th>
              <th onClick={() => handleSort("creationTime")}>
                Hours Since Creation
              </th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through organ data and render table rows */}
            {sortedData.map((organ) => (
              <tr key={organ.id}>
                <td>{organ.organType}</td>
                <td>{calculateHoursSinceCreation(organ.creationTime)}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => openEditModal(organ)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(organ.id)}
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
        contentLabel="Edit Organ Modal"
      >
        <h2>Edit Organ</h2>
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

export default OrganTable;
