import React from "react";
import styles from "./project.module.css";
import Img from "gatsby-image";

import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { LinkButton } from "./button";
import { IconContext } from "@react-icons/all-files/lib";

const Project = ({ project }) => {
  return (
    <div className={styles.projectContainer}>
      <Img fluid={project.coverImage.localFile.childImageSharp.fluid} />
      <div className={styles.projectContent}>
        <div className={styles.projectContentContainer}>
          <p className={styles.title}>{project.title}</p>
          <p className={styles.description}>{project.description}</p>
          <ul className={styles.technologiesContainer}>
            {project.technologies.map((technology) => (
              <li className={styles.technology}>{technology.title}</li>
            ))}
          </ul>
          <div>
            <IconContext.Provider value={{ style: { marginLeft: 5 } }}>
              {project.link && (
                <LinkButton href={project.link}>
                  Live demo
                  <FaExternalLinkAlt />
                </LinkButton>
              )}
              {project.github && (
                <a href={project.github}>
                  Source code
                  <FaGithub />
                </a>
              )}
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
