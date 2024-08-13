import React, { useState } from 'react';
import CTC_Alert from 'ctc-alert';

function Notification_Example() {
  const [notifications, setNotifications] = useState([]);

  const handleClick = (type, header, message, link = null) => {
    // make a new notificatoin
    const newNotification = {
      id: Date.now(),  
      severity: type,
      header: header,
      message: message,
      link: { text: link, href: "#" }
    };

    // add the new notification to the array
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

    setTimeout(() => {
      // notifications array holds the newly created notification for 3 seconds 
      setNotifications((prevNotifications) =>
        prevNotifications.filter(notification => notification.id !== newNotification.id)
      );
    }, 3000);  // show notificatoins for 3 seconds
  };

  return (
    <div className='flex flex-col'>
      {notifications.map((notification) => (
        <CTC_Alert
          key={notification.id}
          severity={notification.severity}
          header={notification.header}
          message={notification.message}
          link={notification.link}
        />
      ))}
      <button className="usa-button usa-button--outline usa-focus" type="button" onClick={() => handleClick('info', "header", "sample message", "sample link")}>
        Info
      </button>
      <button className="usa-button usa-button--outline usa-focus" type="button" onClick={() => handleClick('error', "header", "sample message", "sample link")}>
        Error
      </button>
      <button className="usa-button usa-button--outline usa-focus" type="button" onClick={() => handleClick('warning', "header", "sample message", "sample link")}>
        Warning
      </button>
    </div>
  );
}

export default Notification_Example;
