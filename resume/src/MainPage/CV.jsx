import { Route } from "react-router-dom";
import my from "../images/my.jpg";
import React from "react";
import styles from ".//CV.module.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCss3,
  faFigma,
  faGithub,
  faHtml5,
  faJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import {
  collection, 
  onSnapshot,
} from "firebase/firestore";
import db, { storage } from "../LogIn/firebase";
import { getData } from "../Redux/dataSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../Redux/store";
const CV = () => {
  const userFromRedux = useTypedSelector((state) => state.data.users);
  const dispatch = useAppDispatch();
  const collectionRef = collection(db, "users");
  const [editID, setEditID] = useState("");
  const getInfo = () => {
    onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));     
      dispatch(
        getData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    });
  };
  useEffect(() => {
    getInfo();
  }, []);
  return (
    <div>
       {userFromRedux?.length > 0 &&
        userFromRedux?.map((item) => (
        <div key={item.id}>
          {editID !== item.id ? (
            <>
              <div className={styles.box}>
                <Navbar />
                <div id="Home" className={styles.container}>
                  <div className={styles.left}>
                    <div className={styles.profile}>
                      {item?.image !== "" && (
                        <>
                          <img
                            src={item.image}
                            alt={item.imageName}
                            style={{
                              backgroundSize: "cover",
                              width: "100%",
                            }}
                          />
                        </>
                      )}
                    </div>
                    <div className={styles.content}>
                      <h1 id="About">About me</h1>
                      <p>{item.about}</p>
                      <br />
                      <p>
                        <span style={{ color: "white" }}>
                          My strengths are:
                        </span>{" "}
                        {item.strengths}
                      </p>
                      <br />
                      <div className={styles.focus}>
                        <h1 id="Contact">Contact</h1>
                        <p>{item.location}</p>
                        <p>{item.phone}</p>
                        <p>{item.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.cube}></div>
                    <div className={styles.main}>
                      <div className={styles.intro}>
                        <br />
                        <h1 className={styles.ma}>{item.firstname}</h1>
                        <h1>
                          <strong>{item.lastname}</strong>
                        </h1>
                        <p className={styles.phead}>{item.profession}</p>
                        <div className={styles.clearfix}></div>
                        <hr className={styles.hr1} />
                      </div>
                      <br />
                      <div className={styles.rightContent}>
                        <h1 className={styles.head}>Experience</h1>
                        <hr className={styles.hr2} />
                        <div className={styles.clearfix}></div>
                        <p className={styles.para}>{item.experience}</p>
                      </div>
                      <div className={styles.rightContent}>
                        <h1 className={styles.head}>Education</h1>
                        <hr className={styles.hr2} />
                        <div className={styles.clearfix}></div>
                        <p className={styles.para}>
                          {item.education}
                          <strong>
                            ({item.years1} - {item.years2})
                          </strong>
                        </p>
                        <p className={styles.par}>
                          {item.info}
                          <br />
                          <b>{item.additional}</b>
                        </p>
                        <p className={styles.para}>
                          <strong>({item.years3})</strong>
                        </p>
                        <p className={styles.par}>{item.courses1}</p>
                        <p className={styles.para}>
                          <strong>
                            ({item.years4}-{item.years5})
                          </strong>
                        </p>
                        <p className={styles.par}>{item.courses2}</p>
                      </div>

                      <div className={styles.rightContent}>
                        <h1 id="Skills" className={styles.head}>
                          Skills
                        </h1>
                        <hr className={styles.hr2} />
                        <br />
                        <br />
                        <div className={styles.firstWrapper}>
                          <div>
                            <FontAwesomeIcon
                              icon={faJs}
                              className={styles.icon}
                            />
                            <p>JavaScript</p>
                          </div>
                          <div>
                            <FontAwesomeIcon
                              icon={faHtml5}
                              className={styles.icon}
                            />
                            <p>HTML5</p>
                          </div>
                          <div>
                            <FontAwesomeIcon
                              icon={faCss3}
                              className={styles.icon}
                            />
                            <p>CSS3</p>
                          </div>
                        </div>
                        <div className={styles.secondWrapper}>
                          <div>
                            <FontAwesomeIcon
                              icon={faGithub}
                              className={styles.icon}
                            />
                            <p>GitHub</p>
                          </div>
                          <div>
                            <FontAwesomeIcon
                              icon={faReact}
                              className={styles.icon}
                            />
                            <p>React</p>
                          </div>
                          <div>
                            <FontAwesomeIcon
                              icon={faFigma}
                              className={styles.icon}
                            />
                            <p>Figma</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cube2}></div>
                </div>
              </div>
            </>
          ) : (
            <>
             <p>Hello World!</p>
            </>
          )}
        
        </div>
      ))}
  </div>

  );
};
export default CV;
