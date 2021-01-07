require("dotenv").config();

const { githubApiQuery } = require("./github-query");

module.exports = {
  siteMetadata: {
    title: `Jan Krzeptowski`,
    description: `Jan Krzeptowski is a front-end developer.`,
    author: `@saj96n`,
    menuLinks: [
      { to: "/#", string: "Home" },
      { to: "/#about", string: "About" },
      { to: "/#projects", string: "Projects" },
      { to: "/#contact", string: "Contact" },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        path: `${__dirname}/locales`,
        languages: [`en`, `pl`],
        defaultLanguage: `pl`,

        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jan Krzeptowski`,
        short_name: `Jan Krzeptowski`,
        start_url: `/`,
        background_color: `#5e25ff`,
        theme_color: `#5e25ff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-webpack-bundle-analyser-v2`,
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: process.env.SITE_ID,
        matomoUrl: process.env.MATOMO_URL,
        siteUrl: "https://jkrzeptowski.pl",
      },
    },
    {
      resolve: "gatsby-source-github-api",
      options: {
        token: process.env.GITHUB_TOKEN,
        graphQLQuery: githubApiQuery,
        variables: {
          user: process.env.GITHUB_USER,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
