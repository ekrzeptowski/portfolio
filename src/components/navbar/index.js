import React, { useState } from "react";

import * as styles from "./index.module.scss";

import { Divide as Hamburger } from "hamburger-react";
import useMedia from "use-media";
import { Link, useTranslation } from "gatsby-plugin-react-i18next";

const NavbarLinks = ({ menuLinks, scrolled }) => {
  const { t } = useTranslation();
  return (
    <ul
      className={`container ${styles.linksContainer} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      {menuLinks.map((link, i) => (
        <li className={styles.link} key={i}>
          <Link to={link.to}>{t(link.string)}</Link>
        </li>
      ))}
    </ul>
  );
};

export function Navbar({ menuLinks, scrolled }) {
  const mobile = !useMedia({ minWidth: "37.5rem" });
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`${styles.navbar} ${expanded ? styles.expanded : ""}`}>
      {mobile && (
        <div className={styles.hamburgerContainer}>
          <Hamburger
            label={t("Show menu")}
            toggled={expanded}
            toggle={setExpanded}
          />
        </div>
      )}
      <NavbarLinks menuLinks={menuLinks} scrolled={scrolled} />
    </div>
  );
}
