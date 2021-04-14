import React from "react";
import { IconContext } from "@react-icons/all-files/lib";

import * as styles from "./icon.module.scss";

export const Icon = ({ icon }) => {
  return (
    <div className={styles.iconStyle}>
      <IconContext.Provider value={{ color: "#fff", size: 32 }}>
        {icon}
      </IconContext.Provider>
    </div>
  );
};
