import React from "react";
import { useForm } from "react-hook-form";
import { Input, TextArea } from "../input";

import styles from "./index.module.css";

const ContactForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("name"));
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        ref={register}
        placeholder="Your name *"
        autoComplete="name"
        aria-label="Your name"
        required
      />
      <Input
        name="email"
        type="email"
        ref={register}
        placeholder="Your e-mail *"
        aria-label="Your e-mail"
        required
      />
      <TextArea
        name="message"
        ref={register}
        placeholder="Your message *"
        aria-label="Your message"
        required
      />
      <Input type="submit" />
    </form>
  );
};

export default ContactForm;
