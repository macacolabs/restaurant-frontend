"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const checkLoginStatus = () => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("accessToken");
      setIsLogin(!!token);

      if (token) {
        try {
          const decoded = JSON.parse(atob(token.split(".")[1]));
          if (decoded.memberRole && decoded.memberRole[0]) {
            setUserRole(decoded.memberRole[0].authority.authorityName);
          }
        } catch (error) {
          console.error("Token decode error:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    }
  };

  const login = () => {
    setIsLogin(true);
    checkLoginStatus();
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("accessToken");
    }
    setIsLogin(false);
    setUserRole(null);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const value = {
    isLogin,
    userRole,
    login,
    logout,
    checkLoginStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
