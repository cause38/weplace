import React from "react";
<<<<<<< front/src/pages/Login/index.js
import Form from "components/form";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const Login = () => {
  const navigate = useNavigate();

  const setLogin = () => {
    navigate("/");
  };

  const setRegister = () => {
    navigate("/join");
  };

  return (
    <div>
      <Form
        title="Login"
        userName="userName"
        passWord="passWord"
        setLogin={() => setLogin()}
        setRegister={() => setRegister()}
      />
    </div>
  );
};

export default Login;
