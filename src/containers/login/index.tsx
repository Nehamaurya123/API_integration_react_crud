import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss';

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://assignment.cyberboxer.com/auth/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("authenticated", "true");
        navigate("/home");
        console.log("***** Login Done ******");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
    <div className={styles.login_container}>
      <div className={styles.login}><h2>Login here...</h2></div>
      Email
        <div className={styles.email}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>
      Password
       <div className={styles.password}>
      <input
      type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
    </>
  );
};

export default LoginContainer;
