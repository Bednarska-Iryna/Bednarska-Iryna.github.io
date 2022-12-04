import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AppRoutes, AppRedirectRoutes } from "../Route/AppRoutes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RedirectRoutes } from "../../../common/Routes";
import { auth } from "./firebase";
import { EnterTypes } from "../common/Type";
const SignUp = ({ page }) => {
  console.log(page);
  const [formValue, setFormValue] = useState("email", "password");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    return () => setSuccess(false);
  }, []);
  const handleSignUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );
      setSuccess((prevState) => !prevState);
      setTimeout(() => {
        setSuccess((prevState) => !prevState);
        setFormValue("email", "password");
        navigate(`${AppRedirectRoutes.CV}${AppRoutes.LOGIN}`);
      }, 3000);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const handleSignIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );
      localStorage.setItem("user", JSON.stringify(user));
      setSuccess(true);
      setTimeout(() => {
        setSuccess((prevState) => !prevState);
        setFormValue("email", "password");
        navigate(`${RedirectRoutes.Iryna}${MyRoutes.CV}`);
      }, 3000);
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

  console.log(formValue);
  return (
    <div>
      {!success ? (
        <>
          <form action="">
            <label point="">Email</label>
            <input
              type="email"
              value={formValue.email}
              onChange={(event) => handleChange(event, "email")}
            />
            <label point="">Password</label>
            <input
              type="password"
              value={formValue.password}
              onChange={(event) => handleChange(event, "password")}
            />
          </form>
          <br />
          <button
            onClick={page === EnterTypes.SIGN_UP ? handleSignUp : handleSignIn}
          >
            {page}
          </button>
        </>
      ) : (
        <h1>SUCCESS</h1>
      )}
    </div>
  );
};
export default SignUp;
