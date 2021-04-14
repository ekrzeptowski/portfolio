import React, { forwardRef } from "react";

import { Trans } from "gatsby-plugin-react-i18next";

import * as styles from "./About.module.scss";
import { SectionTitle } from "../typography";

const About = forwardRef((props, ref) => {
  return (
    <section id="about" ref={ref}>
      <SectionTitle>
        <Trans>About me</Trans>
      </SectionTitle>
      <div
        className={styles.aboutContent}
        dangerouslySetInnerHTML={{ __html: props.about }}
      ></div>
    </section>
  );
});

export default About;
