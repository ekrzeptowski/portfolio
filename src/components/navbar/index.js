import { Link } from "gatsby"
import React from "react"

import styles from "./index.module.css"

const NavbarLinks = ({ menuLinks }) => (
  <ul className={styles.linksContainer}>
    {menuLinks.map((link, i) => (
      <li className={styles.link} key={i}>
        <Link to={link.to}>{link.string}</Link>
      </li>
    ))}
  </ul>
)

export function Navbar({ menuLinks }) {
  return (
    <div>
      <NavbarLinks menuLinks={menuLinks} />
    </div>
  )
}
