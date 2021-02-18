/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = require.resolve(`./src/templates/project.js`);
  const result = await graphql(`
    query {
      allMyDev {
        nodes {
          article {
            body_markdown
            cover_image
            id
            published_at
            slug
            tag_list
            title
            url
            user {
              name
              username
              website_url
            }
          }
        }
      }
      allContentfulProject(
        filter: { node_locale: { eq: "pl" }, devtoSlug: { ne: null } }
      ) {
        edges {
          node {
            devtoSlug
            node_locale
            longDescription {
              longDescription
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  result.data.allMyDev.nodes.forEach(({ article }) => {
    article.tag_list.includes("showdev") &&
      createPage({
        path: `en/project/${article.slug}`,
        component: blogPostTemplate,
        context: {
          article: article,
          language: "en",
        },
      });
  });
  result.data.allContentfulProject.edges.forEach(async ({ node }) => {
    const devPost = await graphql(
      `
        query getDevPost($slug: String) {
          myDev(article: { slug: { eq: $slug } }) {
            article {
              cover_image
              title
            }
          }
        }
      `,
      { slug: node.devtoSlug }
    );
    createPage({
      path: `project/${node.devtoSlug}`,
      component: blogPostTemplate,
      context: {
        article: {
          body_markdown: node.longDescription.longDescription,
          cover_image: devPost.data.myDev.article.cover_image,
          title: devPost.data.myDev.article.title,
        },
        language: "pl",
      },
    });
  });
};
