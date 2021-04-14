import React from "react";

import * as styles from "./index.module.scss";

export const SectionTitle = ({ children }) => {
  return <h1 className={styles.sectionTitle}>{children}</h1>;
};

export const SubTitle = ({ children }) => (
  <h2 className={styles.subTitle}>{children}</h2>
);
