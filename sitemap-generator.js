require("dotenv").config();

const { configureSitemap } = require("@sergeymyssak/nextjs-sitemap");
const fetch = require("node-fetch");
const config = require("./src/config.js");

const url = new URL(config.siteUrl);

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json());
}

async function getProjectSlugs(locale) {
  const projects = await fetchGraphQL(
    `query {
        projectCollection(locale: "${locale}") {
            items {
              devtoSlug
            }
          }
      }`,
  );

  const slugs = [];
  projects?.data?.projectCollection?.items.forEach((project) => {
    project.devtoSlug && slugs.push(project.devtoSlug);
  });

  return slugs;
}

getProjectSlugs("en")
  .then((slugs) => {
    const paths = [];
    slugs.forEach((project) => {
      paths.push(`/project/${project}`);
    });
    return paths;
  })
  .then((paths) => {
    const Sitemap = configureSitemap({
      domains: [
        { domain: url.hostname, defaultLocale: "pl", locales: config.locales },
      ],
      include: paths,
      excludeIndex: true,
      exclude: ["/project/*", "/404"],
      trailingSlash: false,
      targetDirectory: __dirname + "/public",
      pagesDirectory: __dirname + "/src/pages",
    });

    Sitemap.generateSitemap();
  });
