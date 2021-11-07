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

export async function getPageSections(page, locale) {
  const sections = await fetchGraphQL(
    `query {
        pageCollection(where: {name: "${page}"}, locale: "${locale}") {
            items {
                title
                name
                description
                sectionsCollection {
                    items {
                        title
                        type
                        content
                    }
                }
            }
        }
    }`,
  );

  return sections?.data?.pageCollection?.items[0]?.sectionsCollection?.items;
}

export async function getProjects(locale) {
  const projects = await fetchGraphQL(
    `query {
        projectCollection(locale: "${locale}") {
            items {
              title
              technologyCollection {
                items {
                  ...on Technology {
                    title
                  }
                }
              }
              description
              devtoSlug
              link
              repo
              preview {
                url
              }
            }
          }
      }`,
  );

  return projects?.data?.projectCollection?.items;
}

export async function getTechnologyCategory(locale) {
  const categories = await fetchGraphQL(
    `query {
        technologyCategoryCollection(
          locale: "${locale}"
          order: order_ASC
          limit: 10
        ) {
          items {
            type
            technologyCollection (
                limit: 20
            ) {
              items {
                ...on Technology {
                  title
                  description
                  logo {
                    url
                  }
                }
              }
            }
          }
        }
      }`,
  );

  return categories?.data?.technologyCategoryCollection?.items;
}

export async function getContact() {
  const contact = await fetchGraphQL(
    `query {
        contactCollection (limit: 1) {
          items {
            email
            phone
            socialNetworksCollection {
              items {
                ... on Link {
                  title
                  url
                }
              }
            }
          }
        }
      }`,
  );

  return contact?.data?.contactCollection?.items[0];
}
