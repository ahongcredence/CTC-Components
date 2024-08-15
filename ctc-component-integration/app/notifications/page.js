'use client'
import React, { useState } from 'react';
import CTC_Alert from 'ctc-alert';
import { useRouter } from 'next/navigation';
function Notification_Example() {
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const handleClick = (type, header, message, link = null) => {
    // make a new notificatoin
    const newNotification = {
      id: Date.now(),
      severity: type,
      header: header,
      message: message,
      link: { text: link.text, href: link.href }
    };

    // add the new notification to the array
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

    setTimeout(() => {
      // notifications array holds the newly created notification for 3 seconds 
      setNotifications((prevNotifications) =>
        prevNotifications.filter(notification => notification.id !== newNotification.id)
      );
    }, 3000);
  };

  return (
    <div className='demo-container'>
      <div className="container-info">
        <h1>Notifications</h1>
        <h2>Installation</h2>
        <p>
          <strong>To install:</strong> <code>npm install ctc-alert</code><br />
          <strong>To import:</strong> <code>import CTC_Alert from 'ctc-alert'</code>
        </p>
      </div>



      <div className='component-container '>
        {notifications.map((notification) => (
          <CTC_Alert
            key={notification.id}
            severity={notification.severity}
            header={notification.header}
            message={notification.message}
            link={notification.link}
          />
        ))}
        <div className='notifications-button-group'>
          <button
            className="usa-button usa-button--outline usa-focus"
            type="button"
            onClick={() => handleClick('info', "Info", "sample message", "sample link")}>
            Info
          </button>
          <button
            className="usa-button usa-button--outline usa-focus"
            type="button"
            onClick={() => handleClick('error', "Error", "sample message", { text: "sample link text", href: "sample link" })}>
            Error
          </button>
          <button
            className="usa-button usa-button--outline usa-focus"
            type="button"
            onClick={() => handleClick('warning', "Warning", "sample message", "sample link")}>
            Warning
          </button>

        </div>
        <div className='absolute bottom-4 left-4'>
          <button
            className="usa-button usa-button--secondary"
            onClick={() => router.push('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification_Example;
