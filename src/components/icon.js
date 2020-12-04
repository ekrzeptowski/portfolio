import React from "react";
import { IconContext } from "@react-icons/all-files/lib";

import styles from "./icon.module.css";

export const Icon = ({ icon }) => {
  return (
    <div className={styles.iconStyle}>
      <IconContext.Provider value={{ color: "#fff", size: 32 }}>
        {icon}
      </IconContext.Provider>
    </div>
  );
};