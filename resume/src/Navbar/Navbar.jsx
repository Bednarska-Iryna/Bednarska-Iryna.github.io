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
  const nav1 = ()=> {
    return(
      navigate (AppRoutes.MAIN_PAGE)
    )
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.nav}>    
      <div className={styles.a} onClick={nav1}><a>Home</a></div>       
        <div className={styles.a} onClick={nav}><a>Login</a></div> 
              
      </div>    
    </div>
  );
};
export default Navbar;