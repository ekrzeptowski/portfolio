import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation, Trans } from "next-i18next";

import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import { IconContext } from "@react-icons/all-files/lib";

import { LinkButton } from "./button";
import * as styles from "./project.module.scss";

const Project = ({ project }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.projectContainer}>
      <div
        style={{
          position: "relative",
          aspectRatio: `${project.preview.width} / ${project.preview.height}`,
        }}
      >
        <Image
          src={project.preview.url}
          alt={`${project.title} preview`}
          layout="fill"
          objectFit="cover"
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
