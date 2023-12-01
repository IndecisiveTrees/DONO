import React from "react";

const PastOrgans = () => {
  const pastOrgansData = [
    {
      id: "101",
      type: "Heart",
      donorName: "Michael Johnson",
      donorBloodGroup: "A+",
      transplantDate: new Date("2022-03-15"),
    },
    {
      id: "102",
      type: "Kidney",
      donorName: "Sarah Davis",
      donorBloodGroup: "B-",
      transplantDate: new Date("2021-08-22"),
    },
    {
      id: "103",
      type: "Liver",
      donorName: "Christopher Wilson",
      donorBloodGroup: "O+",
      transplantDate: new Date("2020-05-10"),
    },
    {
      id: "104",
      type: "Lung",
      donorName: "Emma White",
      donorBloodGroup: "AB-",
      transplantDate: new Date("2019-12-18"),
    },
    {
      id: "105",
      type: "Kidney",
      donorName: "Daniel Brown",
      donorBloodGroup: "A-",
      transplantDate: new Date("2018-06-30"),
    },
  ];

  return (
    <div className="page">
      <h2 className="text-center">Past Organs</h2>
      <div className="table-container">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Organ Type</th>
              <th>Donor Name</th>
              <th>Donor Blood Group</th>
              <th>Transplant Date</th>
            </tr>
          </thead>
          <tbody>
            {pastOrgansData.map((organ) => (
              <tr key={organ.id}>
                <td>{organ.type}</td>
                <td>{organ.donorName}</td>
                <td>{organ.donorBloodGroup}</td>
                <td>{organ.transplantDate.toDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PastOrgans;
