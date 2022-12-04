// import { createUserWithEmailAndPassword } from "firebase/auth";
import { AppRoutes, AppRedirectRoutes } from "../Route/Routes"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { auth } from "./firebase";
import style from "./LogIn.module.css"
const SignIn = () => {
    // const [formValue, setFormValue] = useState("email", "password");
    const [success, setSuccess] = useState (false)
    // const navigate = useNavigate();
    // const handleSignUp = async () => {
    //   try {
    //     const user = await createUserWithEmailAndPassword(
    //       auth,
    //       formValue.email,
    //       formValue.password
    //     );
    //     localStorage.setItem("user", JSON.stringify(user));
    //     setSuccess(true)
    //     setTimeout (()=>navigate(`${AppRedirectRoutes.CV}${AppRoutes.LOGIN}`), 3000)
    //   } catch (e) {
    //       console.log(e)
    //   } finally {
    //   }
    // };
    // const handleChange = (event, key) => {
    //   setFormValue({
    //     ...formValue,
    //     [key]: event.target.value,
    //   });
    // };  
    // console.log(formValue);
    return(
<div className={style.box}>
   <h2>Sign In</h2>
   <br/>
   <br/>
    {!success ? 
          <>
        <form action="">
          <label point=""> Email </label> <br/><br/>
          <input
            type="email"
            // value={formValue.email}
            // onChange={(event) => handleChange(event, "email")}
          />
          <br/><br/><br/>
          <label point=""> Password </label> <br/><br/>
          <input
            type="password"
            // value={formValue.password}
            // onChange={(event) => handleChange(event, "password")}
          />
        </form>
        <br />
        {/* <button onClick={handleSignUp}>Login</button> */}
        </>
        :<h1>SUCCESS</h1>}
        
</div>
    )
}
export default SignIn;