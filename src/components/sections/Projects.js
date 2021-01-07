import React from "react";
import Project from "../project";
import { SectionTitle, SubTitle } from "../typography";

import { Trans } from "gatsby-plugin-react-i18next";

import styles from "./Projects.module.scss";

import { Masonry } from "masonic";

import { RepoCard } from "react-repo-widget";

const Projects = ({ projects, githubUser }) => {
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
      <SubTitle>
        <Trans>My GitHub projects</Trans>
      </SubTitle>
      <Masonry
        items={githubUser.repositories.nodes}
        style={{ outline: "none" }}
        columnGutter={5}
        render={({ index, data }) => (
          <RepoCard key={index} center repo={data} />
        )}
        columnWidth={360}
      />
    </section>
  );
};

export default Projects;
