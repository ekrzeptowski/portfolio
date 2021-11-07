import React from "react";
import Project from "../project";
import { SectionTitle, SubTitle } from "../typography";

import { Trans } from "next-i18next";

import * as styles from "./Projects.module.scss";

import Masonry from "react-masonry-css";

import { RepoCard } from "react-repo-widget";
require("react-repo-widget/dist-esm/styles.css");

const breakpointColumns = {
  default: 3,
  1100: 3,
  960: 2,
  750: 1,
};

const Projects = ({ projects, githubUser }) => {
  return (
    <section id="projects">
      <SectionTitle>
        <Trans>Projects</Trans>
      </SectionTitle>
      {/* <SubTitle>TODO: Filter bar</SubTitle> */}
      <div className={styles.projectsContainer}>
        {projects.map((project) => {
          return <Project key={project.title} project={project} />;
        })}
      </div>
      <SubTitle>
        <Trans>My GitHub projects</Trans>
      </SubTitle>
      <Masonry
        breakpointCols={breakpointColumns}
        className={styles.gridContainer}
        columnClassName={styles.gridColumn}
      >
        {githubUser.map((repo) => (
          <RepoCard center key={repo.name} repo={repo} />
        ))}
      </Masonry>
    </section>
  );
};

export default Projects;
