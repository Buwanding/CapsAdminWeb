// src/hooks/useAuth.js

import { useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { isAuthenticated, setIsAuthenticated, userRole, setUserRole, loading, setLoading } = context;

  // Check for existing auth state on mount
  useEffect(() => {
    const checkAuthState = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (token && role) {
        setIsAuthenticated(true);
        setUserRole(parseInt(role));
      }
      setLoading(false);
    };

    checkAuthState();
  }, [setIsAuthenticated, setUserRole, setLoading]);

  const login = useCallback((token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setIsAuthenticated(true);
    setUserRole(parseInt(role));
  }, [setIsAuthenticated, setUserRole]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
  }, [setIsAuthenticated, setUserRole]);

  return {
    isAuthenticated,
    userRole,
    login,
    logout,
    loading
  };
};