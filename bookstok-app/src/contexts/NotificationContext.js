// NotificationContext.js
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [notification, ...prevNotifications]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, loggedInUserId, setLoggedInUserId }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
