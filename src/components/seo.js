/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useI18next } from "gatsby-plugin-react-i18next";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, canonical, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  const {
    languages,
    language,
    originalPath,
    defaultLanguage,
    siteUrl = "",
  } = useI18next();

  const createUrlWithLang = lng => {
    const url = `${siteUrl}${
      lng === defaultLanguage ? "" : `/${lng}`
    }${originalPath}`;
    return url.endsWith("/") ? url : `${url}/`;
  };

  return (
    <Helmet
      htmlAttributes={{ lang: language }}
      title={title ? title : defaultTitle}
      titleTemplate={title ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      {languages.map(lng => (
        <link
          rel="alternate"
          key={lng}
          href={createUrlWithLang(lng)}
          hrefLang={lng}
        />
      ))}
      <link
        rel="alternate"
        href={createUrlWithLang(defaultLanguage)}
        hrefLang="x-default"
      />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `pl`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default SEO;
