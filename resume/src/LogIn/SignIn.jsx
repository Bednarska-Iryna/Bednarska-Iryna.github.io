import { createUserWithEmailAndPassword } from "firebase/auth";
import { AppRoutes } from "../Route/AppRoutes";
import { Button, ButtonToolbar } from "rsuite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import style from "./LogIn.module.css";
const SignIn = () => {
  const [formValue, setFormValue] = useState("email", "password");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );
      localStorage.setItem(
        "user",
        JSON.stringify({ user: "Iryna", role: "admin" })
      );
      console.log("user");
      setSuccess(true);
      setTimeout(() => {
        setSuccess((prevState) => !prevState);
        setFormValue("email", "password");
        navigate(AppRoutes.ADMIN);
      }, 1000);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const handleChange = (event, key) => {
    setFormValue({
      ...formValue,
      [key]: event.target.value,
    });
  };
  return (
    <div className={style.box}>
      <h2>Sign In</h2>
      <br />
      <br />
      {!success ? (
        <>
          <form action="">
            <label point=""> Email </label> <br />
            <br />
            <input
              type="email"
              value={formValue.email}
              onChange={(event) => handleChange(event, "email")}
            />
            <br />
            <br />
            <br />
            <label point=""> Password </label> <br />
            <br />
            <input
              type="password"
              value={formValue.password}
              onChange={(event) => handleChange(event, "password")}
            />
          </form>
          <br />
          <br />
          <br />
          <br />
          <ButtonToolbar>
            <Button
              color="cyan"
              size="lg"
              appearance="primary"
              onClick={handleSignIn}
            >
              Submit
            </Button>
          </ButtonToolbar>
        </>
      ) : (
        <h1>SUCCESS</h1>
      )}
    </div>
  );
};
export default SignIn;
