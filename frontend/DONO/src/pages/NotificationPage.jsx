import React, { useState, useEffect } from "react";
import NotificationCard from "../components/NotificationCard"; // You need to create a NotificationCard component

const NotificationPage = () => {
  const [organNotifications, setOrganNotifications] = useState([]);
  const [recipientNotifications, setRecipientNotifications] = useState([]);

  useEffect(() => {
    // Fetch organ and recipient notifications from your API or data source
    // For the sake of example, I'm using dummy data
    const fetchNotifications = async () => {
      try {
        // Fetch organ notifications
        const organData = await fetchOrganNotifications();
        setOrganNotifications(organData);

        // Fetch recipient notifications
        const recipientData = await fetchRecipientNotifications();
        setRecipientNotifications(recipientData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const fetchOrganNotifications = async () => {
    // Fetch organ notifications from your API
    // This function should return an array of organ notifications
    // Each organ notification should be an object with organ, recipient, hospital details, etc.
    // For simplicity, I'm using dummy data
    return [
      {
        id: "1",
        organ: "Heart",
        bloodType: "A+",
        viability: "4",
        severity: "3",
        recipient: {
          name: "John Doe",
          age: 45,
        },
        hospital: {
          name: "Hospital ABC",
          location: "City XYZ",
        },
        timeout: 600, // in seconds
      },
      // Add more organ notifications as needed
    ];
  };

  const fetchRecipientNotifications = async () => {
    // Fetch recipient notifications from your API
    // This function should return an array of recipient notifications
    // Each recipient notification should be an object with recipient, donor, hospital details, etc.
    // For simplicity, I'm using dummy data
    return [
      {
        id: "1",
        recipient: {
          name: "Jane Smith",
          age: 30,
        },
        donor: {
          name: "Alice Johnson",
          age: 55,
          bloodType: "B-",
        },
        hospital: {
          name: "Hospital XYZ",
          location: "City ABC",
        },
        timeout: 600, // in seconds
      },
      // Add more recipient notifications as needed
    ];
  };

  const handleAccept = (notification) => {
    // Handle logic when the user accepts the notification
    console.log("Accepted:", notification);
    // You may redirect the user or perform other actions
  };

  const handleDecline = (notification) => {
    // Handle logic when the user declines the notification
    console.log("Declined:", notification);
    // You may redirect the user or perform other actions
  };

  return (
    <div className="page">
      <h2 className="text-center">Notification Center</h2>
      <div className="notification-list">
        <h3>Organ Notifications</h3>
        {organNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onAccept={() => handleAccept(notification)}
            onDecline={() => handleDecline(notification)}
            type={"OrganFound"}
          />
        ))}
      </div>
      <div className="notification-list mt-3">
        <h3>Recipient Notifications</h3>
        {recipientNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            type="RecipientFound"
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
