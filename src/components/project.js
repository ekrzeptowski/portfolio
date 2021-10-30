import React from "react";
import * as styles from "./project.module.scss";
import Img from "gatsby-image";

import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";

import { LinkButton } from "./button";
import { IconContext } from "@react-icons/all-files/lib";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";
import { GatsbyImage } from "gatsby-plugin-image";

const Project = ({ project }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.projectContainer}>
      <GatsbyImage
        image={project.preview.gatsbyImageData}
        alt={`${project.title} preview`}
      />
      <div className={styles.projectContent}>
        <div className={styles.projectContentContainer}>
          <p className={styles.title}>{project.title}</p>
          <p className={styles.description}>
            {project.description?.description}
          </p>
          {project.devtoSlug && (
            <Link
              to={`/project/${project.devtoSlug}`}
              className={`link ${styles.link}`}
              title={`${t("Read more about")} ${project.title}`}
            >
              <Trans>Read more</Trans>
              <IconContext.Provider
                value={{ style: { verticalAlign: "middle" }, size: 28 }}
              >
                <MdKeyboardArrowRight />
              </IconContext.Provider>
            </Link>
          )}
          <ul className={styles.technologiesContainer}>
            {project.technology.map((technology) => (
              <li key={technology.title}>{technology.title}</li>
            ))}
          </ul>
          <div>
            <IconContext.Provider value={{ style: { marginLeft: 5 } }}>
              {project.link && (
                <LinkButton href={project.link}>
                  <Trans>Live demo</Trans>
                  <FaExternalLinkAlt />
                </LinkButton>
              )}
              {project.repo && (
                <LinkButton href={project.repo}>
                  <Trans>Source code</Trans>
                  <FaGithub />
                </LinkButton>
              )}
            </IconContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
