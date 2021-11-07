import React from "react";
import Tippy from "@tippyjs/react";
import { SectionTitle } from "../typography";

import { Trans } from "next-i18next";

import * as styles from "./Skills.module.scss";
import "tippy.js/dist/tippy.css";

const Skills = ({ skills }) => {
  return (
    <section id="skills">
      <SectionTitle>
        <Trans>Skills</Trans>
      </SectionTitle>
      <div className={styles.skillsContainer}>
        {skills.map((stack) => (
          <div key={stack.type}>
            <h2>{stack.type}</h2>
            <div className={styles.techs}>
              {stack.technologyCollection.items.map((tech) => (
                <div key={tech.title}>
                  <Tippy content={tech.description}>
                    <img src={tech.logo.url} alt={tech.title} />
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
