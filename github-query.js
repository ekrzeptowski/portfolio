exports.githubApiQuery = `
query($user: String!) {
    user(login: $user) {
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
  }
`;
