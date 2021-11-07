async function fetchGitHub(query, preview = false) {
  return fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());
}

export async function getGitHubRepos() {
  const repos = await fetchGitHub(
    `query {
        user(login: "${process.env.GITHUB_USER}") {
            repositories(first: 10, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC) {
              nodes {
                description
                name
                stargazerCount
                primaryLanguage {
                  name
                }
                pushedAt
                watchers {
                  totalCount
                }
                licenseInfo {
                  spdxId
                }
                forks {
                  totalCount
                }
                owner {
                  avatarUrl
                  login
                }
              }
            }
          }
      }`,
  );

  return repos?.data?.user?.repositories?.nodes;
}
