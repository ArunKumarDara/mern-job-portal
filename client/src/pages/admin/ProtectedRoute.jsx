/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null && user.role !== "recruiter") {
      navigate("/");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;
