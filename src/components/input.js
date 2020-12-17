import React, { forwardRef } from "react";

import styles from "./input.module.scss";

export const Input = forwardRef(({ primary, ...props }, ref) => {
  return (
    <input
      className={`${styles.input} ${primary ? styles.primary : ""}`}
      ref={ref}
      {...props}
    />
  );
});

export const TextArea = forwardRef(({ ...props }, ref) => {
  return <textarea className={styles.input} ref={ref} {...props}></textarea>;
});

export const SubmitButton = forwardRef(({ primary, ...props }, ref) => {
  return (
    <input
      className={`${styles.button} ${primary ? styles.primary : ""}`}
      ref={ref}
      type="submit"
      {...props}
    />
  );
});
