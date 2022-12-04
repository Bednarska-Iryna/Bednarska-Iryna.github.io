import styles from "../Navbar/Navbar.module.css"
import { AppRoutes } from "../Route/AppRoutes";

import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const nav = ()=> {
    return(
      navigate (AppRoutes.LOGIN)
    )
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.nav}>    
        <div className={styles.a}><a href="#Home">Home</a></div>
        <div className={styles.a}> <a href="#About">About</a></div>
        <div className={styles.a}><a href="#Skills">Skills</a></div>
        <div className={styles.a}><a href="#Contact">Contact</a></div> 
        <div className={styles.a} onClick={nav}><a>Login</a></div> 
              
      </div>    
    </div>
  );
};
export default Navbar;