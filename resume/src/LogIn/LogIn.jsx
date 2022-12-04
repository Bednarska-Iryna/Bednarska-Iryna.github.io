import style from "./LogIn.module.css"
import SignIn from "./SignIn";
const LogIn = ()=>{
    return(
        <div className={style.page}>
          <div className={style.container}>
          <div className={style.left}>
            <div className={style.area}>Welcome!</div> 
         
          </div>
           <div className={style.right}> <SignIn/></div>
          </div>

        {/* <Link to={`${AppRedirectRoutes.CV}${AppRedirectRoutes.FIREBASE}${AppRoutes.LOGIN}`}>
          <span style={{ fontSize: "50px" }}>Sign In</span>
        </Link>
        <Link to={`${AppRedirectRoutes.CV}${AppRedirectRoutes.FIREBASE}${AppRoutes.SIGN_UP}`}>
          <span style={{ fontSize: "50px" }}>Sign Up</span>
        </Link>
       
        <Routes>
          <Route path={AppRoutes.LOGIN} element={<SignUp page={EnterTypes.SIGN_IN}/>}/>
          <Route path={AppRoutes.SIGN_UP} element={<SignUp page={EnterTypes.SIGN_UP}/>}/>
           
        </Routes>
      */}



      </div>
        )

}
export default LogIn;