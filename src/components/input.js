import React, { forwardRef } from "react";

import styles from "./input.module.css";

export const Input = forwardRef(({ ...props }, ref) => {
  return <input className={styles.input} ref={ref} {...props} />;
});

export const TextArea = forwardRef(({ ...props }, ref) => {
  return <textarea className={styles.input} ref={ref} {...props}></textarea>;
});
