import React from "react";

import styles from "./index.module.css";

export const SectionTitle = ({ children }) => {
  return <h1 className={styles.sectionTitle}>{children}</h1>;
};
