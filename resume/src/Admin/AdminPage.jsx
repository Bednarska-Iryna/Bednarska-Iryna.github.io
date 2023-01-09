import { Route } from "react-router-dom";
// import my from "../images/my.jpg";
import React from "react";
import styles from ".//Admin.module.css";
import Navbar from "../Navbar/Navbar";
import {getData} from "../Redux/dataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCss3,
  faFigma,
  faGithub,
  faHtml5,
  faJs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import db, { storage } from "../LogIn/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import {useAppDispatch, useTypedSelector} from "../Redux/store";

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const userFromRedux = useTypedSelector(state => state.data.users);
  const [editID, setEditID] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [users, setUsers] = useState([]);
  const collectionRef = collection(db, "users");
  const [formValues, setFormValues] = useState({
    about: "",
    additional: "",
    courses1: "",
    courses2: "",
    education: "",
    email: "",
    experience: "",
    firstname: "",
    info: "",
    lastname: "",
    location: "",
    phone: "",
    profession: "",
    strengths: "",
    years1: "",
    years2: "",
    years3: "",
    years4: "",
    years5: "",
    image: null,
    imageName: null,
  });
  const [editFormValues, setEditFormValues] = useState({
    about: "",
    additional: "",
    courses1: "",
    courses2: "",
    education: "",
    email: "",
    experience: "",
    firstname: "",
    info: "",
    lastname: "",
    location: "",
    phone: "",
    profession: "",
    strengths: "",
    years1: "",
    years2: "",
    years3: "",
    years4: "",
    years5: "",
    image: null,
    imageName: null,
  });

  const handleInputChange = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };

  const getInfo = () => {
    onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      dispatch(
        getData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    });
  };
  useEffect(() => {
    getInfo();
  }, []);

  const handleEdit = (user) => {
    if (user.id === editID) {
      editUser(editFormValues);
      setEditID("");
    } else {
      setEditID(user.id);
      setEditFormValues(user);
    }
  };
  const editUser = async (user) => {
    const docRef = doc(db, "users", user.id);
    try {
      await setDoc(docRef, user);
    } catch (e) {
      console.log(e);
    }
  };
  const handleUpload = (e) => {
    setIsDisabled((prevState) => !prevState);
    const storageRef = ref(storage, `/images/${e.target.files[0].name}`);
    const uploadData = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadData.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadData.snapshot.ref).then((url) => {
          setEditFormValues({
            ...editFormValues,
            image: url,
            imageName: e.target.files[0].name,
          });
          console.log(url);
          setIsDisabled((prevState) => !prevState);
        });
      }
    );
  };
  console.log(userFromRedux);
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
                <div className={styles.box}>
                  <Navbar />
                  <div id="Home" className={styles.container}>
                    <div className={styles.left}>
                      <div className={styles.profile}>
                        <input type="file" onChange={handleUpload} />
                        <img
                          style={{ backgroundSize: "cover", width: "100%" }}
                          src={editFormValues?.image}
                          alt="photo"
                        />
                      </div>
                      <div className={styles.content}>
                        <h1 id="About">About me</h1>
                        <textarea
                          className={styles.txt}
                          type="text"
                          value={editFormValues.about}
                          onChange={(e) =>
                            setEditFormValues({
                              ...editFormValues,
                              about: e.target.value,
                            })
                          }
                        />
                        <br />
                        <p>
                          <span style={{ color: "white" }}>
                            My strengths are:
                          </span>{" "}
                          <textarea
                            className={styles.txt}
                            type="text"
                            value={editFormValues.strengths}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                strengths: e.target.value,
                              })
                            }
                          />
                        </p>
                        <br />
                        <div className={styles.focus}>
                          <h1 id="Contact">Contact</h1>
                          <input
                            className={styles.para3}
                            type="text"
                            value={editFormValues.location}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                location: e.target.value,
                              })
                            }
                          />
                          <input
                            className={styles.para3}
                            type="text"
                            value={editFormValues.phone}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                phone: e.target.value,
                              })
                            }
                          />
                          <input
                            className={styles.para3}
                            type="text"
                            value={editFormValues.email}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.cube}></div>
                      <div className={styles.main}>
                        <div className={styles.intro}>
                          <br />
                          <input
                            className={styles.para4}
                            type="text"
                            value={editFormValues.firstname}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                firstname: e.target.value,
                              })
                            }
                          />
                          <input
                            className={styles.para4}
                            type="text"
                            value={editFormValues.lastname}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                lastname: e.target.value,
                              })
                            }
                          />
                          <input
                            className={styles.para4}
                            type="text"
                            value={editFormValues.profession}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                profession: e.target.value,
                              })
                            }
                          />
                          <div className={styles.clearfix}></div>
                          <hr className={styles.hr1} />
                        </div>
                        <br />
                        <div className={styles.rightContent}>
                          <h1 className={styles.head}>Experience</h1>
                          <hr className={styles.hr2} />
                          <div className={styles.clearfix}></div>
                          <textarea
                            className={styles.para}
                            type="text"
                            value={editFormValues.experience}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                experience: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className={styles.rightContent}>
                          <h1 className={styles.head}>Education</h1>
                          <hr className={styles.hr2} />
                          <div className={styles.clearfix}></div>
                          <p className={styles.para}>
                            <strong>
                              <input
                                className={styles.para2}
                                type="number"
                                value={editFormValues.years1}
                                onChange={(e) =>
                                  setEditFormValues({
                                    ...editFormValues,
                                    years1: e.target.value,
                                  })
                                }
                              />
                              <input
                                className={styles.para2}
                                type="number"
                                value={editFormValues.years2}
                                onChange={(e) =>
                                  setEditFormValues({
                                    ...editFormValues,
                                    years2: e.target.value,
                                  })
                                }
                              />
                            </strong>
                            <textarea
                              className={styles.para1}
                              type="text"
                              value={editFormValues.education}
                              onChange={(e) =>
                                setEditFormValues({
                                  ...editFormValues,
                                  education: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p className={styles.par}>
                            <textarea
                              className={styles.para1}
                              type="text"
                              value={editFormValues.info}
                              onChange={(e) =>
                                setEditFormValues({
                                  ...editFormValues,
                                  info: e.target.value,
                                })
                              }
                            />
                            <br />
                            <textarea
                              className={styles.para1}
                              type="text"
                              value={editFormValues.additional}
                              onChange={(e) =>
                                setEditFormValues({
                                  ...editFormValues,
                                  additional: e.target.value,
                                })
                              }
                            />
                          </p>
                          <p className={styles.para}>
                            <strong>
                              {" "}
                              <input
                                className={styles.para2}
                                type="number"
                                value={editFormValues.years3}
                                onChange={(e) =>
                                  setEditFormValues({
                                    ...editFormValues,
                                    years3: e.target.value,
                                  })
                                }
                              />
                            </strong>
                          </p>
                          <textarea
                            className={styles.para1}
                            type="text"
                            value={editFormValues.courses1}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                courses1: e.target.value,
                              })
                            }
                          />
                          <p className={styles.para}>
                            <strong>
                              <input
                                className={styles.para2}
                                type="number"
                                value={editFormValues.years4}
                                onChange={(e) =>
                                  setEditFormValues({
                                    ...editFormValues,
                                    years4: e.target.value,
                                  })
                                }
                              />
                              <input
                                className={styles.para2}
                                type="number"
                                value={editFormValues.years5}
                                onChange={(e) =>
                                  setEditFormValues({
                                    ...editFormValues,
                                    years5: e.target.value,
                                  })
                                }
                              />
                            </strong>
                          </p>
                          <textarea
                            className={styles.para1}
                            type="text"
                            value={editFormValues.courses2}
                            onChange={(e) =>
                              setEditFormValues({
                                ...editFormValues,
                                courses2: e.target.value,
                              })
                            }
                          />
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
            )}
            <button
              className={styles.btn}
              disabled={editID === item.id && isDisabled}
              onClick={() => handleEdit(item)}
            >
              {editID !== item.id ? "Edit" : "Save"}
            </button>
          </div>
        ))}
    </div>
  );
};
export default AdminPage;
