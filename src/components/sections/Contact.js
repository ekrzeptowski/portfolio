import React from "react";
import ContactForm from "../contactForm";
import { Icon } from "../icon";
import { SectionTitle, SubTitle } from "../typography";

import styles from "./Contact.module.scss";

import { FaPhone } from "@react-icons/all-files/fa/FaPhone";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { parsePhoneNumber } from "libphonenumber-js";

const Contact = ({ contact }) => {
  const phoneNumber = parsePhoneNumber(contact.contactPhone);
  const parsedNumber = phoneNumber.formatInternational();
  return (
    <section id="contact">
      <SectionTitle>Contact</SectionTitle>
      <div className={styles.contactContainer}>
        <div className={styles.links}>
          <div className={styles.social}>
            {/* <div> */}
            <a
              className={`${styles.contactLink} ${styles.text}`}
              href={`tel:${contact.contactPhone}`}
            >
              <Icon icon={<FaPhone />} />
              {parsedNumber}
            </a>
            <a
              className={`${styles.contactLink} ${styles.text}`}
              href={`mailto:${contact.contactEmail}`}
            >
              <Icon icon={<FaEnvelope />} />
              {contact.contactEmail}
            </a>
            {/* </div> */}
          </div>
          <div>
            <SubTitle>Social</SubTitle>
            <a
              className={styles.contactLink}
              href="https://www.linkedin.com/in/jan-krzeptowski-7152a011b/"
            >
              <Icon icon={<FaLinkedin />} />
            </a>
            <a className={styles.contactLink} href="https://github.com/saj96n">
              <Icon icon={<FaGithub />} />
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
