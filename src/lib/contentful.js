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

export async function getPage(pageName, locale) {
  const page = await fetchGraphQL(
    `query {
        pageCollection(where: {name: "${pageName}"}, locale: "${locale}", limit: 1) {
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

  return page?.data?.pageCollection?.items[0];
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
                width
                height
              }
            }
          }
      }`,
  );

  return projects?.data?.projectCollection?.items;
}

export async function getProjectSlugs(locale) {
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

export async function getProjectDescription(slug, locale) {
  const description = await fetchGraphQL(
    `query {
      projectCollection(
        where: { devtoSlug: "${slug}" }
        locale: "${locale}"
        limit: 1
      ) {
        items {
          description
          longDescription
        }
      }
    }`,
  );

  return description?.data?.projectCollection?.items[0];
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
