// src/context/AuthContext.js

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSideBarMenuOpen, setIsSideBarMenuOpen] = React.useState(true);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userRole,
        setUserRole,
        loading,
        setLoading,
        isSideBarMenuOpen,
        setIsSideBarMenuOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
