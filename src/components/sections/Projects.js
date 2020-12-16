import React from "react";
import Project from "../project";
import { SectionTitle, SubTitle } from "../typography";

import styles from "./Projects.module.scss";

const Projects = ({ projects }) => {
  return (
    <section id="projects">
      <SectionTitle>Projects</SectionTitle>
      <SubTitle>TODO: Filter bar</SubTitle>
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
