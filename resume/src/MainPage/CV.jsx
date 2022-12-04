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
const CV = () => {
  return (
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
            <p>
              After finishing my studies in Logos Front-end Academy, I'm looking
              for a job in IT to start my career. I want to use my skills in
              creating website, gain experience and to develop as a specialist.
            </p>
            <br />
            <p>
              <span style={{ color: "white" }}>My strengths are:</span> the
              ability to convey and defend one's ideas, sociability, maximum
              efficiency in work, responsible and conscientious performance of
              any tasks, organization, purposefulness. An extremely energetic
              person who helps me achieve my goals.
            </p>
            <br />
            <div className={styles.focus}>
              <h1 id="Contact">Contact</h1>
              <p>
                <i class="fa fa-map"></i> &nbsp;Lviv,Ukraine{" "}
              </p>
              <p>
                <i class="fa fa-phone"></i> &nbsp;phone +380980546109
              </p>
              <p>
                <i class="fa fa-envelope"></i> &nbsp;email :
                bednarska.ira.2000@gmail.com
              </p>
            </div>
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
              <h1 className={styles.head}>Experience</h1>
              <hr className={styles.hr2} />
              <div className={styles.clearfix}></div>
              <p className={styles.para}>
                I HAVE NO COMMERCIAL EXPERIENCE IN IT INDUSTRY YET, THEREFORE
                I'M DETERMINED TO GET ONE.{" "}
              </p>
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
                I was earned a bachelor's degree in "Slavic languages and
                literature" (including translation).
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
              <p className={styles.par}>Studying in Logos Front-end Academy</p>
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
    </div>
  );
};
export default CV;
