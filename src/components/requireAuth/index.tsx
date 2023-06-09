import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface privateAuth {
  children?: React.ReactNode;
}

const PrivateRoute = (props: privateAuth) => {
  const navigate = useNavigate();

  useEffect(() => {
    let authenticated = localStorage.getItem("authenticated");
    !authenticated && navigate("/login");
  });

  return <>{props.children}</>;
};

export default PrivateRoute;
