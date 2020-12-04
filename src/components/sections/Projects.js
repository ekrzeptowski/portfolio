import React from "react";
import { SectionTitle, SubTitle } from "../typography";

const Projects = ({ projects }) => {
  return (
    <section id="projects">
      <SectionTitle>Projects</SectionTitle>
      <SubTitle>TODO: Filter bar</SubTitle>
      {projects.map((project) => {
        project = project.node;
        return (
          <div>
            <p>{project.title}</p>
            <p>{project.description}</p>
          </div>
        )
      })}
    </section>
  );
};

export default Projects;
