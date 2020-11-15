import PropTypes from "prop-types";
import React from "react";
import { Navbar } from "./navbar";

const Header = ({ siteTitle, menuLinks }) => (
  <section>
    <Navbar menuLinks={menuLinks} />
  </section>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
