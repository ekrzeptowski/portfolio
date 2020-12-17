/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import "normalize.css";
import "./layout.scss";
import { Navbar } from "./navbar";

const Layout = ({ children }) => {
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

  return (
    <>
      <Navbar
        siteTitle={data.site.siteMetadata?.title || `Title`}
        menuLinks={data.site.siteMetadata?.menuLinks}
      />
      <div>
        <main className="container">{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
            padding: `10px 5px`,
          }}
          className="container"
        >
          © {new Date().getFullYear()}, Built with
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
