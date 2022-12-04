import styles from "../Navbar/Navbar.module.css"
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.nav}>    
        <div className={styles.a}><a href="#Home">Home</a></div>
        <div className={styles.a}> <a href="#About">About</a></div>
        <div className={styles.a}><a href="#Skills">Skills</a></div>
        <div className={styles.a}><a href="#Contact">Contact</a></div> 
        <div className={styles.a}>Login</div>       
      </div>    
    </div>
  );
};
export default Navbar;