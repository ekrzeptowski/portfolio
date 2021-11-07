import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { Input, SubmitButton, TextArea } from "../input";
import { useForm } from "react-hook-form";

import * as styles from "./index.module.scss";

import { FaRegSmile } from "@react-icons/all-files/fa/FaRegSmile";
import { Icon } from "../icon";

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

const ContactForm = () => {
  const { t } = useTranslation();

  const { register, handleSubmit } = useForm();

  const [sent, setSent] = useState(false);

  const onSubmit = (data) => {
    fetch(
      "https://script.google.com/macros/s/AKfycbxmKCbInQ3lS5baKkXoSc3llq9JDiW4aGnN8MwPh5KbmBMPSYMy/exec",
      {
        method: "POST",
        body: getFormData(data),
      },
    ).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setSent(true);
      }
    });
  };
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        placeholder={`${t("Your name")} *`}
        autoComplete="name"
        aria-label={t("Your name")}
        required
      />
      <Input
        {...register("email")}
        type="email"
        placeholder={`${t("Your e-mail")} *`}
        aria-label={t("Your e-mail")}
        required
      />
      <TextArea
        {...register("message")}
        placeholder={`${t("Your message")} *`}
        aria-label={t("Your message")}
        required
      />
      <SubmitButton primary />
      {sent && (
        <div className={styles.overlay}>
          <Icon icon={<FaRegSmile />} />
          <span>{t("Message has been sent successfully")}</span>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
