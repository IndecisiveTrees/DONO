import React, { useState, useEffect } from "react";

const NotificationCard = ({ notification, onAccept, onDecline, type }) => {
  const [timeRemaining, setTimeRemaining] = useState(notification.timeout);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [notification.timeout]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const renderOrganFound = () => (
    <div className="notification-details">
      <p>
        Organ: {notification.organ} (Blood Type: {notification.bloodType})
      </p>
      <p>
        Recipient: {notification.recipient.name} (Age:{" "}
        {notification.recipient.age})
      </p>
      <p>
        Hospital: {notification.hospital.name} ({notification.hospital.location}
        )
      </p>
    </div>
  );

  const renderRecipientFound = () => (
    <div className="notification-details">
      <p>
        Recipient: {notification.recipient.name} (Age:{" "}
        {notification.recipient.age})
      </p>
      <p>
        Donor: {notification.donor.name} (Blood Type:{" "}
        {notification.donor.bloodGroup})
      </p>
      <p>
        Hospital: {notification.hospital.name} ({notification.hospital.location}
        )
      </p>
    </div>
  );

  return (
    <div className={`notification-card card ${type.toLowerCase()}`}>
      {type === "OrganFound" ? renderOrganFound() : renderRecipientFound()}
      {type === "OrganFound" && (
        <div className="notification-actions">
          <p>Time Remaining: {formatTime(timeRemaining)}</p>
          <button className="btn btn-success" onClick={onAccept}>
            Accept
          </button>
          <button className="btn btn-danger" onClick={onDecline}>
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
