import React from "react";

const PastRecipients = () => {
  const pastRecipientsData = [
    {
      id: "11",
      name: "John Smith",
      dob: new Date("1970-01-01"),
      sex: "Male",
      phone: "123-456-7890",
      organReceived: "Kidney",
      transplantDate: new Date("2022-01-15"),
    },
    {
      id: "12",
      name: "Alice Johnson",
      dob: new Date("1965-05-22"),
      sex: "Female",
      phone: "555-123-4567",
      organReceived: "Heart",
      transplantDate: new Date("2021-08-10"),
    },
    {
      id: "13",
      name: "Charlie Brown",
      dob: new Date("1958-12-10"),
      sex: "Male",
      phone: "321-654-9870",
      organReceived: "Lung",
      transplantDate: new Date("2020-05-05"),
    },
    {
      id: "14",
      name: "Eva Thompson",
      dob: new Date("1972-04-18"),
      sex: "Female",
      phone: "444-555-6666",
      organReceived: "Liver",
      transplantDate: new Date("2019-11-30"),
    },
    {
      id: "15",
      name: "George Wilson",
      dob: new Date("1960-09-25"),
      sex: "Male",
      phone: "999-888-7777",
      organReceived: "Kidney",
      transplantDate: new Date("2018-06-20"),
    },
  ];

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
      <h2 className="text-center">Past Recipients</h2>
      <div className="table-container">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Organ Received</th>
              <th>Transplant Date</th>
            </tr>
          </thead>
          <tbody>
            {pastRecipientsData.map((recipient) => (
              <tr key={recipient.id}>
                <td>{recipient.name}</td>
                <td>{calculateAge(recipient.dob)}</td>
                <td>{recipient.organReceived}</td>
                <td>{recipient.transplantDate.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastRecipients;
