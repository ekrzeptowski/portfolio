import React from "react";

import * as styles from "./input.module.scss";

export function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

export function LinkButton(props) {
  return (
    <a {...props} className={styles.button}>
      {props.children}
    </a>
  );
}
