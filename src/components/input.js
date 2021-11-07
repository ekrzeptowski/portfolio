import React, { forwardRef } from "react";

import * as styles from "./input.module.scss";

export const Input = forwardRef(function Input({ primary, ...props }, ref) {
  return (
    <input
      className={`${styles.input} ${primary ? styles.primary : ""}`}
      ref={ref}
      {...props}
    />
  );
});

export const TextArea = forwardRef(function TextArea({ ...props }, ref) {
  return <textarea className={styles.input} ref={ref} {...props}></textarea>;
});

export const SubmitButton = forwardRef(function SubmitButton(
  { primary, ...props },
  ref,
) {
  return (
    <input
      className={`${styles.button} ${primary ? styles.primary : ""}`}
      ref={ref}
      type="submit"
      {...props}
    />
  );
});
