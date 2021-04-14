require("dotenv").config();

const { githubApiQuery } = require("./github-query");

module.exports = {
  siteMetadata: {
    title: `Jan Krzeptowski`,
    description: `Jan Krzeptowski is a front-end developer.`,
    author: `@saj96n`,
    siteUrl: "https://jkrzeptowski.pl",
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/src/svg/`,
        },
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`
      }
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`en`, `pl`],
        defaultLanguage: `pl`,
        siteUrl: "https://jkrzeptowski.pl",
        pages: [
          {
            matchPath: "/:lang?/project/:slug",
            getLanguageFromPath: true,
            excludeLanguages: ["en"],
          },
        ],
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
    {
      resolve: `gatsby-source-mydev`,
      options: {
        apiKey: process.env.DEVTO_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/**/404", "/**/404.html"],
        query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allSitePage(filter: {context: {i18n: {routed: {eq: false}}}}) {
                edges {
                  node {
                    context {
                      i18n {
                        defaultLanguage
                        languages
                        originalPath
                      }
                    }
                    path
                  }
                }
              }
            }
          `,
        serialize: ({ site, allSitePage }) => {
          return allSitePage.edges.map(edge => {
            const {
              languages,
              originalPath,
              defaultLanguage,
            } = edge.node.context.i18n;
            const { siteUrl } = site.siteMetadata;
            const url = siteUrl + originalPath;
            const links = [
              { lang: defaultLanguage, url },
              { lang: "x-default", url },
            ];
            languages.forEach(lang => {
              if (lang === defaultLanguage) return;
              links.push({ lang, url: `${siteUrl}/${lang}${originalPath}` });
            });
            return {
              url,
              changefreq: "daily",
              priority: originalPath === "/" ? 1.0 : 0.7,
              links,
            };
          });
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
