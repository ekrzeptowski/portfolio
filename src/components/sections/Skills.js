import React from "react";
import Tippy from "@tippyjs/react";
import { SectionTitle } from "../typography";

import { Trans } from "gatsby-plugin-react-i18next";

import styles from "./Skills.module.scss";
import "tippy.js/dist/tippy.css";

const Skills = ({ skills }) => {
  return (
    <section id="skills">
      <SectionTitle>
        <Trans>Skills</Trans>
      </SectionTitle>
      <div className={styles.skillsContainer}>
        {skills.map(stack => (
          <div key={stack.node.type}>
            <h2>{stack.node.type}</h2>
            <div className={styles.techs}>
              {stack.node.technology.map(tech => (
                <div key={tech.title}>
                  <Tippy content={tech.description?.description}>
                    <img src={tech.logo.localFile.publicURL} alt={tech.title} />
                  </Tippy>
                  <p>{tech.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
