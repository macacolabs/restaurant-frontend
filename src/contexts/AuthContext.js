"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken, removeToken } from "../utils/cookieUtils";

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
    const token = getToken(); // Cookie에서 토큰 확인
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
  };

  const login = () => {
    setIsLogin(true);
    checkLoginStatus();
  };

  const logout = () => {
    removeToken(); // Cookie와 localStorage 모두에서 토큰 제거
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
