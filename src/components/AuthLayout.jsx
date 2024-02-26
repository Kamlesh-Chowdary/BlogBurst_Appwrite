import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthLayout = ({ children, isAuthenticated = true }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.status);

  useEffect(() => {
    if (isAuthenticated && authStatus) {
      navigate("/");
    } else if (!isAuthenticated && !authStatus) {
      navigate("/login");
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, [authStatus, navigate, isAuthenticated]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
