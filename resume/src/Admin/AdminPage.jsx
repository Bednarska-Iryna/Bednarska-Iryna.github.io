import { Route } from "react-router-dom";
import my from "../images/my.jpg";
import React from "react";
import styles from ".//Admin.module.css";
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

const Admin = () => {
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

  // const addInfo = async () => {
  //   try {
  //     const docRef = await addDoc(collectionRef, formValues);
  //     console.log(docRef);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const getInfo = () => {
    onSnapshot(collectionRef, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  useEffect(() => {
    getInfo();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // addInfo();
  };
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
      await setDoc(docRef, {
        firstname: user.firstname,
        secondtname: user.name,
        image: user.image,
        imageName: user.imageName,
      });
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
  return (
    <div className={styles.box}>
      <Navbar />
      <div id="Home" className={styles.container}>
        <div className={styles.left}>
          <div className={styles.profile}>
            <input
              type="file"
              onChange={handleUpload}
              style={{
                // marginTop: "350px",
                backgroundSize: "cover",
                width: "100%",
              }}
            />
            <img
              style={{ backgroundSize: "cover", width: "100%" }}
              src={editFormValues?.image}
              alt="photo"
            />
          </div>
          <div className={styles.content}>
            {/* <form onSubmit={handleSubmit}>
              <h1 id="About">About me</h1>
              <textarea
                className={styles.txt}
                name="about"
                type="string"
                value={formValues.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
              />
              <span style={{ color: "white" }}>My strengths are:</span>{" "}
              <textarea
                className={styles.txt}
                name="about"
                type="string"
                value={formValues.strengths}
                onChange={(e) => handleInputChange("strengths", e.target.value)}
              />
              <div className={styles.focus}>
                <h1 id="Contact">Contact</h1>
                <textarea
                  className={styles.txt}
                  name="contact"
                  type="string"
                  value={formValues.contact}
                  onChange={(e) => handleInputChange("contact", e.target.value)}
                />
              </div>
              <input className={styles.btn} type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.cube}></div>
          <div className={styles.main}>
            <div className={styles.intro}>
              <br />
              <h1 className={styles.ma}>Iryna</h1>
              <h1>
                <strong>Bednarska</strong>
              </h1>
              <p className={styles.phead}>Student</p>
              <div className={styles.clearfix}></div>
              <hr className={styles.hr1} />
            </div>
            <br />
            <div className={styles.rightContent}>
              <form onSubmit={handleSubmit}>
                <h1 className={styles.head}>Experience</h1>
                <hr className={styles.hr2} />
                <div className={styles.clearfix}></div>
                <textarea
                  className={styles.para}
                  name="experience"
                  type="string"
                  value={formValues.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                />
                <div className={styles.rightContent}>
                  <h1 className={styles.head}>Education</h1>
                  <hr className={styles.hr2} />
                  <div className={styles.clearfix}></div>
                </div>
                <textarea
                  className={styles.para1}
                  name="education"
                  type="string"
                  value={formValues.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                />
                <input
                  className={styles.para2}
                  name="years1"
                  type="number"
                  value={formValues.years1}
                  onChange={(e) => handleInputChange("years1", e.target.value)}
                />
                <textarea
                  className={styles.para1}
                  name="achievement"
                  type="string"
                  value={formValues.achievement}
                  onChange={(e) =>
                    handleInputChange("achievement", e.target.value)
                  }
                />
                <input
                  className={styles.para2}
                  name="years2"
                  type="number"
                  value={formValues.years2}
                  onChange={(e) => handleInputChange("years2", e.target.value)}
                />
                <textarea
                  className={styles.para1}
                  name="courses1"
                  type="string"
                  value={formValues.courses1}
                  onChange={(e) =>
                    handleInputChange("courses1", e.target.value)
                  }
                />
                <input
                  className={styles.para2}
                  name="years3"
                  type="number"
                  value={formValues.years3}
                  onChange={(e) => handleInputChange("years3", e.target.value)}
                />
                <textarea
                  className={styles.para1}
                  name="courses2"
                  type="string"
                  value={formValues.courses2}
                  onChange={(e) =>
                    handleInputChange("courses2", e.target.value)
                  }
                />
              </form>
              <input className={styles.btn1} type="submit" value="Submit" />
            </div> */}

            <div className={styles.rightContent}>
              <h1 id="Skills" className={styles.head}>
                Skills
              </h1>
              <hr className={styles.hr2} />
              <br />
              <br />
              <div className={styles.firstWrapper}>
                <div>
                  <FontAwesomeIcon icon={faJs} className={styles.icon} />
                  <p>JavaScript</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHtml5} className={styles.icon} />
                  <p>HTML5</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCss3} className={styles.icon} />
                  <p>CSS3</p>
                </div>
              </div>
              <div className={styles.secondWrapper}>
                <div>
                  <FontAwesomeIcon icon={faGithub} className={styles.icon} />
                  <p>GitHub</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faReact} className={styles.icon} />
                  <p>React</p>
                </div>
                <div>
                  <FontAwesomeIcon icon={faFigma} className={styles.icon} />
                  <p>Figma</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cube2}></div>
      </div>
      {users?.length > 0 &&
        users?.map((item) => (
          <div key={item.id}>
            {editID !== item.id ? (
              <>
                {/* <h1>About me</h1>
            <p>
             {item.about}
            </p>
            <br />
            <p>
              <span style={{ color: "white" }}>My strengths are:</span> {item.strengths}
            </p> */}
                <div className={styles.box}>
                  <Navbar />
                  <div id="Home" className={styles.container}>
                    <div className={styles.left}>
                      <div className={styles.profile}>
                        <img
                          style={{ backgroundSize: "cover", width: "100%" }}
                          src={my}
                          alt="photo"
                        />
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
                          <p>
                            <i class="fa fa-map"></i>
                            {item.location}
                          </p>
                          <p>
                            <i class="fa fa-phone"></i> {item.phone}
                          </p>
                          <p>
                            <i class="fa fa-envelope"></i> {item.email}
                          </p>
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
                            IVAN FRANKO NATIONAL UNIVERSITY OF LVIV{" "}
                            <strong>(2017 - 2021)</strong>
                          </p>
                          <p className={styles.par}>
                            I was earned a bachelor's degree in "Slavic
                            languages and literature" (including translation).
                            <br />
                            <b>Additional information: Diploma with honors.</b>
                          </p>
                          <p className={styles.para}>
                            <strong>(2021)</strong>
                          </p>
                          <p className={styles.par}>
                            English language courses, "Green Forest" in Lviv
                          </p>
                          <p className={styles.para}>
                            <strong>(2021-2022)</strong>
                          </p>
                          <p className={styles.par}>
                            Studying in Logos Front-end Academy
                          </p>
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
                {/* {item?.image !== "" && (
                  <>
                    <img src={item.image} alt="" />
                    <button
                      style={{
                        backgroundColor: "deepskyblue",
                        color: "white",
                      }}
                      onClick={() => handleDeleteImage(item)}
                    >
                      {" "}
                      Delete Image{" "}
                    </button>
                  </>
                )} */}
              </>
            ) : (
              <>
                {/* <input type="file" onChange={handleUpload} />
                <br /> <br /> <br /> */}
                <input
                  style={{ color: "blue" }}
                  type="text"
                  value={editFormValues.about}
                  onChange={(e) =>
                    setEditFormValues({
                      ...editFormValues,
                      firstname: e.target.value,
                    })
                  }
                />
                <input
                  style={{ color: "blue" }}
                  type="text"
                  value={editFormValues.strengths}
                  onChange={(e) =>
                    setEditFormValues({
                      ...editFormValues,
                      lastname: e.target.value,
                    })
                  }
                />
              </>
            )}
            <button
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "violet",
                color: "white",
                marginLeft: "10px",
                marginTop: "30px",
              }}
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
export default Admin;
