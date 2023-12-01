import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Modal from "react-modal";

let data = [
  {
    donor: {
      id: "1",
      name: "John Doe",
      dob: new Date("1980-05-15"),
      sex: "Male",
      phone: "123-456-7890",
      nextOfKin: "Jane Doe",
      nextOfKinPhone: "987-654-3210",
      bloodGroup: "A+",
      isDiabetic: false,
      isHypertensive: true,
    },
    type: "Heart",
    creationTime: new Date("2023-01-01T10:30:00"),
    status: "Active",
    description: "Healthy heart for transplant",
  },
  {
    donor: {
      id: "2",
      name: "Alice Johnson",
      dob: new Date("1985-08-22"),
      sex: "Female",
      phone: "555-123-4567",
      nextOfKin: "Bob Johnson",
      nextOfKinPhone: "555-987-6543",
      bloodGroup: "B-",
      isDiabetic: true,
      isHypertensive: false,
    },
    type: "Kidney",
    creationTime: new Date("2023-01-02T08:45:00"),
    status: "Active",
    description: "Kidney for transplant with some conditions",
  },
  {
    donor: {
      id: "3",
      name: "Charlie Smith",
      dob: new Date("1978-12-10"),
      sex: "Male",
      phone: "321-654-9870",
      nextOfKin: "Diana Smith",
      nextOfKinPhone: "789-456-1230",
      bloodGroup: "O+",
      isDiabetic: false,
      isHypertensive: true,
    },
    type: "Liver",
    creationTime: new Date("2023-01-03T15:20:00"),
    status: "Active",
    description: "Liver for transplant with high viability",
  },
  {
    donor: {
      id: "4",
      name: "Eva Thompson",
      dob: new Date("1992-04-18"),
      sex: "Female",
      phone: "444-555-6666",
      nextOfKin: "Frank Thompson",
      nextOfKinPhone: "777-888-9999",
      bloodGroup: "AB+",
      isDiabetic: true,
      isHypertensive: true,
    },
    type: "Lung",
    creationTime: new Date("2023-01-04T12:10:00"),
    status: "Active",
    description: "Lung for transplant with no specific conditions",
  },
  {
    donor: {
      id: "5",
      name: "George Wilson",
      dob: new Date("1980-09-25"),
      sex: "Male",
      phone: "999-888-7777",
      nextOfKin: "Helen Wilson",
      nextOfKinPhone: "666-555-4444",
      bloodGroup: "B+",
      isDiabetic: false,
      isHypertensive: false,
    },
    type: "Kidney",
    creationTime: new Date("2023-01-05T14:00:00"),
    status: "Active",
    description: "Kidney for transplant with moderate viability",
  },
  {
    donor: {
      id: "6",
      name: "Ivy Brown",
      dob: new Date("1995-02-08"),
      sex: "Female",
      phone: "111-222-3333",
      nextOfKin: "Jack Brown",
      nextOfKinPhone: "444-333-2222",
      bloodGroup: "O-",
      isDiabetic: true,
      isHypertensive: false,
    },
    type: "Heart",
    creationTime: new Date("2023-01-06T09:45:00"),
    status: "Active",
    description: "Heart for transplant with low viability",
  },

  {
    donor: {
      id: "7",
      name: "Ivy Brown",
      dob: new Date("1995-02-08"),
      sex: "Female",
      phone: "111-222-3333",
      nextOfKin: "Jack Brown",
      nextOfKinPhone: "444-333-2222",
      bloodGroup: "O-",
      isDiabetic: true,
      isHypertensive: false,
    },
    type: "Heart",
    creationTime: new Date("2023-01-06T09:45:00"),
    status: "Active",
    description: "Heart for transplant with low viability",
  },

  {
    donor: {
      id: "8",
      name: "Ivy Brown",
      dob: new Date("1995-02-08"),
      sex: "Female",
      phone: "111-222-3333",
      nextOfKin: "Jack Brown",
      nextOfKinPhone: "444-333-2222",
      bloodGroup: "O-",
      isDiabetic: true,
      isHypertensive: false,
    },
    type: "Heart",
    creationTime: new Date("2023-01-06T09:45:00"),
    status: "Active",
    description: "Heart for transplant with low viability",
  },

  {
    donor: {
      id: "9",
      name: "Ivy Brown",
      dob: new Date("1995-02-08"),
      sex: "Female",
      phone: "111-222-3333",
      nextOfKin: "Jack Brown",
      nextOfKinPhone: "444-333-2222",
      bloodGroup: "O-",
      isDiabetic: true,
      isHypertensive: false,
    },
    type: "Heart",
    creationTime: new Date("2023-01-06T09:45:00"),
    status: "Active",
    description: "Heart for transplant with low viability",
  },
];

const OrganTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [editedFields, setEditedFields] = useState({
    description: "",
  });
  const navigate = useNavigate();

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

  const calculateHoursSinceCreation = (creationTime) => {
    const now = new Date();
    const diffInMilliseconds = now - new Date(creationTime);
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return Math.round(diffInHours);
  };

  data = data.map((organ) => {
    organ.donorName = organ.donor.name;
    organ.donorAge = calculateAge(organ.donor.dob);
    organ.donorHoursSinceCreation = calculateHoursSinceCreation(
      organ.creationTime
    );
    organ.donorBloodGroup = organ.donor.bloodGroup;
    return organ;
  });

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
              <th onClick={() => handleSort("donorName")}>Donor Name</th>
              <th onClick={() => handleSort("type")}>Organ Type</th>
              <th onClick={() => handleSort("donorAge")}>Donor Age</th>
              <th onClick={() => handleSort("creationTime")}>
                Hours Since Creation
              </th>
              <th onClick={() => handleSort("donorBloodGroup")}>Blood Group</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through organ data and render table rows */}
            {sortedData.map((organ) => (
              <tr key={organ.donor.id}>
                <td>{organ.donor.name}</td>
                <td>{organ.type}</td>
                <td>{calculateAge(organ.donor.dob)}</td>
                <td>{calculateHoursSinceCreation(organ.creationTime)}</td>
                <td>{organ.donor.bloodGroup}</td>
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
                    onClick={() => handleRemove(organ.donor.id)}
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

const handleRemove = (donorId) => {
  // Handle remove logic here
  console.log(`Remove organ with donor ID ${donorId}`);
};

export default OrganTable;
