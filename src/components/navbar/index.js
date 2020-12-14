import { Link } from "gatsby";
import React, { useState } from "react";

import styles from "./index.module.css";

import { Divide as Hamburger } from "hamburger-react";
import useMedia from "use-media";

const NavbarLinks = ({ menuLinks }) => (
  <ul className={`container ${styles.linksContainer}`}>
    {menuLinks.map((link, i) => (
      <li className={styles.link} key={i}>
        <Link to={link.to}>{link.string}</Link>
      </li>
    ))}
  </ul>
);

export function Navbar({ menuLinks }) {
  const mobile = !useMedia({ minWidth: "37.5rem" });
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={`${styles.navbar} ${expanded ? styles.expanded : ""}`}>
      {mobile && (
        <div className={styles.hamburgerContainer}>
          <Hamburger
            label="Show menu"
            toggled={expanded}
            toggle={setExpanded}
          />
        </div>
      )}
      <NavbarLinks menuLinks={menuLinks} />
    </div>
  );
}
