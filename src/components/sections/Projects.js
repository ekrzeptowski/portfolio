import React from "react";
import Project from "../project";
import { SectionTitle } from "../typography";

import { Trans } from "gatsby-plugin-react-i18next";

import styles from "./Projects.module.scss";

const Projects = ({ projects }) => {
  return (
    <section id="projects">
      <SectionTitle>
        <Trans>Projects</Trans>
      </SectionTitle>
      {/* <SubTitle>TODO: Filter bar</SubTitle> */}
      <div className={styles.projectsContainer}>
        {projects.map(project => {
          project = project.node;
          return <Project key={project.title} project={project} />;
        })}
      </div>
    </section>
  );
};

export default Projects;
