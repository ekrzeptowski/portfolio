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
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`project`, `technology`, `technology-category`],
        //If using single types place them in this array.
        singleTypes: [`global`, `home`, `about`],
        // Possibility to login with a strapi user, when content types are not publically available (optional).
        loginData: {
          identifier: "",
          password: "",
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
