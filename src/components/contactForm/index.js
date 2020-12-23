import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Input, SubmitButton, TextArea } from "../input";
import { useForm } from "react-hook-form";

import styles from "./index.module.scss";

const ContactForm = () => {
  const { t } = useTranslation();

  const { register, handleSubmit, watch } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("name"));
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        ref={register}
        placeholder={`${t("Your name")} *`}
        autoComplete="name"
        aria-label={t("Your name")}
        required
      />
      <Input
        name="email"
        type="email"
        ref={register}
        placeholder={`${t("Your e-mail")} *`}
        aria-label={t("Your e-mail")}
        required
      />
      <TextArea
        name="message"
        ref={register}
        placeholder={`${t("Your message")} *`}
        aria-label={t("Your message")}
        required
      />
      <SubmitButton primary />
    </form>
  );
};

export default ContactForm;
