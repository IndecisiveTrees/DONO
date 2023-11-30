import { React, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: "1",
    name: "John Doe",
    dob: new Date("1990-05-15"),
    sex: "Male",
    phone: "123-456-7890",
    nextOfKin: "Jane Doe",
    nextOfKinPhone: "987-654-3210",
    bloodGroup: "A+",
    isDiabetic: false,
    isHypertensive: true,
    description: "Recipient with no specific conditions",
    organNeeded: "Heart",
    severity: "3",
    viability: "4",
  },
  {
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
    description: "Recipient with diabetes",
    organNeeded: "Kidney",
    severity: "2",
    viability: "5",
  },
  {
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
    description: "Recipient with hypertension",
    organNeeded: "Liver",
    severity: "4",
    viability: "3",
  },
  {
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
    description: "Recipient with diabetes and hypertension",
    organNeeded: "Lung",
    severity: "1",
    viability: "5",
  },
  {
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
    description: "Healthy recipient",
    organNeeded: "Kidney",
    severity: "2",
    viability: "4",
  },
  {
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
    description: "Recipient with diabetes",
    organNeeded: "Heart",
    severity: "3",
    viability: "2",
  },
  {
    id: "7",
    name: "Kevin Miller",
    dob: new Date("1975-07-14"),
    sex: "Male",
    phone: "777-666-5555",
    nextOfKin: "Laura Miller",
    nextOfKinPhone: "222-333-4444",
    bloodGroup: "A-",
    isDiabetic: true,
    isHypertensive: true,
    description: "Recipient with diabetes and hypertension",
    organNeeded: "Liver",
    severity: "5",
    viability: "1",
  },
  {
    id: "8",
    name: "Mia Davis",
    dob: new Date("1988-11-30"),
    sex: "Female",
    phone: "666-777-8888",
    nextOfKin: "Nathan Davis",
    nextOfKinPhone: "333-444-5555",
    bloodGroup: "AB-",
    isDiabetic: false,
    isHypertensive: false,
    description: "Healthy recipient",
    organNeeded: "Lung",
    severity: "2",
    viability: "3",
  },
  {
    id: "9",
    name: "Oliver White",
    dob: new Date("1998-06-20"),
    sex: "Male",
    phone: "222-111-4444",
    nextOfKin: "Penelope White",
    nextOfKinPhone: "888-999-0000",
    bloodGroup: "A+",
    isDiabetic: false,
    isHypertensive: false,
    description: "Healthy recipient",
    organNeeded: "Heart",
    severity: "4",
    viability: "4",
  },
  {
    id: "10",
    name: "Sophia Taylor",
    dob: new Date("1983-03-05"),
    sex: "Female",
    phone: "999-111-2222",
    nextOfKin: "Tom Taylor",
    nextOfKinPhone: "555-444-3333",
    bloodGroup: "O+",
    isDiabetic: true,
    isHypertensive: true,
    description: "Recipient with diabetes and hypertension",
    organNeeded: "Kidney",
    severity: "1",
    viability: "5",
  },
];

const RecipientTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [filterOrgan, setFilterOrgan] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [editedFields, setEditedFields] = useState({
    viability: "",
    severity: "",
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

  const openEditModal = (recipient) => {
    setSelectedRecipient(recipient);
    setEditedFields({
      viability: recipient.viability,
      severity: recipient.severity,
      description: recipient.description,
    });
    setModalIsOpen(true);
  };

  const closeEditModal = () => {
    setModalIsOpen(false);
  };

  const handleSaveChanges = () => {
    // Update the recipient with the edited fields
    if (selectedRecipient) {
      // Here you would typically update your data source or make an API call
      console.log(
        `Updating recipient ${selectedRecipient.id} with edited fields`,
        editedFields
      );
    }

    // Close the modal
    closeEditModal();
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
          <option value="Heart">Heart</option>
          <option value="Kidney">Kidney</option>
          <option value="Liver">Liver</option>
          <option value="Lung">Lung</option>
        </select>
      </div>
      <table className="table table-hover align-middle recipient-table">
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

      {/* Edit Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Recipient Modal"
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

const handleRemove = (recipientId) => {
  // Handle remove logic here
  console.log(`Remove recipient with ID ${recipientId}`);
};

const ActiveRecipents = () => {
  return <RecipientTable data={data} />;
};

export default ActiveRecipents;
