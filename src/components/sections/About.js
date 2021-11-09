import React, { forwardRef } from "react";

import { Trans } from "next-i18next";

import * as styles from "./About.module.scss";
import { SectionTitle } from "../typography";
import ReactMarkdown from "react-markdown";

const About = forwardRef(function About(props, ref) {
  return (
    <section id="about" ref={ref}>
      <SectionTitle>
        <Trans>About me</Trans>
      </SectionTitle>
      <div className={styles.aboutContent}>
        <ReactMarkdown>{props.about}</ReactMarkdown>
      </div>
    </section>
  );
});

export default About;
