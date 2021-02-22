/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import "normalize.css";
import "./layout.scss";
import { Navbar } from "./navbar";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const Layout = ({ children, style, offset }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            to
            string
          }
        }
      }
    }
  `);

  const [scrolled, setScrolled] = useState(offset ? false : true);

  useScrollPosition(
    ({ currPos }) => {
      if (offset) {
        -currPos?.y + 132 > offset?.current?.offsetTop
          ? setScrolled(true)
          : setScrolled(false);
      }
    },
    offset,
    [],
    false,
    64
  );

  return (
    <>
      <Navbar
        siteTitle={data.site.siteMetadata?.title || `Title`}
        menuLinks={data.site.siteMetadata?.menuLinks}
        scrolled={scrolled}
      />
      <div style={style}>
        <main className="container">{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
            padding: `25px 5px`,
            textAlign: "center",
          }}
          className="container"
        >
          {data.site.siteMetadata?.title} {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
