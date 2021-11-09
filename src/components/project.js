import React from "react";
import * as styles from "./project.module.scss";
// import Img from "gatsby-image";
import Image from "next/image";
import Link from "next/link";

import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";

import { LinkButton } from "./button";
import { IconContext } from "@react-icons/all-files/lib";
import { useTranslation, Trans } from "next-i18next";
// import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";
// import { GatsbyImage } from "gatsby-plugin-image";

const Project = ({ project }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.projectContainer}>
      <div style={{ position: "relative" }}>
        <Image
          src={project.preview.url}
          alt={`${project.title} preview`}
          layout="fill"
          objectFit="scale-down"
        />
      </div>

      <div className={styles.projectContent}>
        <div className={styles.projectContentContainer}>
          <p className={styles.title}>{project.title}</p>
          <p className={styles.description}>{project.description}</p>
          {project.devtoSlug && (
            <Link
              href={`/project/${project.devtoSlug}`}
              title={`${t("Read more about")} ${project.title}`}
            >
              <a className={`link ${styles.link}`}>
                <Trans>Read more</Trans>
                <IconContext.Provider
                  value={{ style: { verticalAlign: "middle" }, size: 28 }}
                >
                  <MdKeyboardArrowRight />
                </IconContext.Provider>
              </a>
            </Link>
          )}
          <ul className={styles.technologiesContainer}>
            {project.technologyCollection.items.map((technology) => (
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
