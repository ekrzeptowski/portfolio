import React from "react";
import ContactForm from "../contactForm";
import { Icon } from "../icon";
import { SectionTitle, SubTitle } from "../typography";

import styles from "./Contact.module.scss";

import { FaPhone } from "@react-icons/all-files/fa/FaPhone";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { parsePhoneNumber } from "libphonenumber-js";

const RenderIcon = ({ icon }) => {
  switch (icon) {
    case "Linkedin":
      icon = <FaLinkedin />;
      break;
    case "Github":
      icon = <FaGithub />;
      break;
    case "Instagram":
      icon = <FaInstagram />;
      break;
    default:
      break;
  }
  return <Icon icon={icon} />;
};

const Contact = ({ contact }) => {
  const phoneNumber = parsePhoneNumber(contact.phone);
  const parsedNumber = phoneNumber.formatInternational();
  return (
    <section id="contact">
      <SectionTitle>Contact</SectionTitle>
      <div className={styles.contactContainer}>
        <div className={styles.links}>
          <div className={styles.social}>
            <a
              className={`${styles.contactLink} ${styles.text}`}
              href={`tel:${contact.contactPhone}`}
            >
              <Icon icon={<FaPhone />} />
              {parsedNumber}
            </a>
            <a
              className={`${styles.contactLink} ${styles.text}`}
              href={`mailto:${contact.email}`}
            >
              <Icon icon={<FaEnvelope />} />
              {contact.email}
            </a>
          </div>
          <div>
            <SubTitle>Social</SubTitle>
            {contact.socialNetworks.map(link => (
              <a
                key={link.url}
                className={styles.contactLink}
                href={link.url}
                title={link.title}
              >
                <RenderIcon icon={link.title} />
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
