import React from "react";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <section className={styles.headerContainer}>
      <div className="container" style={{ width: "100%" }}>
        <div className={styles.greeting}>
          <h3>Hello, I'm</h3>
          <h1>Jan Krzeptowski</h1>
          <h2>A front-end web developer</h2>
        </div>
      </div>
      <svg className={styles.svg}>
        <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
          <path d="m1,0.841 c-0.06,-0.226,-0.12,-0.485,-0.2,-0.663 c-0.07,-0.145,-0.13,-0.259,-0.2,-0.032 c-0.07,0.178,-0.13,0.695,-0.2,0.808 c-0.07,0.113,-0.13,-0.113,-0.2,-0.339 c-0.07,-0.259,-0.13,-0.356,-0.2,-0.517 v-0.113 h1"></path>
        </clipPath>
      </svg>
    </section>
  );
};

export default Header;