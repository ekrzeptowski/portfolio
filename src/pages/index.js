import React, { createRef } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Header from "../components/sections/Header";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";

import { I18nextContext } from "gatsby-plugin-react-i18next";

const IndexPage = ({
  data: {
    contentfulPage,
    allContentfulProject,
    allContentfulTechnologyCategory,
    contentfulContact,
    allGithubData,
  },
}) => {
  const aboutRef = createRef();
  const { language } = React.useContext(I18nextContext);

  const githubUser = allGithubData.nodes[0].data.user;

  // Dynamic sections creation
  let components = [];
  const sections = contentfulPage.sections;
  sections.forEach((section, index) => {
    switch (section.type) {
      case "hero":
        components.push(
          <Header key={index} bio={section.content.childMarkdownRemark.html} />
        );
        break;
      case "basicText":
        components.push(
          <About
            ref={aboutRef}
            key={index}
            about={section.content.childMarkdownRemark.html}
          />
        );
        break;
      case "skills":
        components.push(
          <Skills key={index} skills={allContentfulTechnologyCategory.edges} />
        );
        break;
      case "projects":
        components.push(
          <Projects
            key={index}
            projects={allContentfulProject.edges}
            githubUser={githubUser}
          />
        );
        break;
      case "contact":
        components.push(<Contact key={index} contact={contentfulContact} />);
        break;
      default:
        break;
    }
  });

  return (
    <Layout offset={aboutRef}>
      <SEO description={contentfulPage.description} lang={language} />
      {components.map(component => component)}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery($language: String) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    
    contentfulPage(name: { eq: "Index" }, node_locale: { eq: $language }) {
      title
      name
      description
      sections {
        title
        type
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }

    allContentfulProject(filter: { node_locale: { eq: $language } }) {
      edges {
        node {
          title
          technology {
            title
          }
          description {
            description
          }
          devtoSlug
          link
          repo
          preview {
            fluid(maxWidth: 840) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }

    allContentfulTechnologyCategory(
      sort: { fields: order, order: ASC }
      filter: { node_locale: { eq: $language } }
    ) {
      edges {
        node {
          type
          technology {
            title
            description {
              description
            }
            logo {
              localFile {
                publicURL
              }
            }
          }
        }
      }
    }

    allGithubData {
      nodes {
        data {
          user {
            repositories {
              nodes {
                description
                name
                stargazerCount
                watchers {
                  totalCount
                }
                pushedAt
                primaryLanguage {
                  name
                }
                owner {
                  avatarUrl
                  login
                }
                licenseInfo {
                  spdxId
                }
                forks {
                  totalCount
                }
              }
            }
          }
        }
      }
    }

    contentfulContact {
      email
      phone
      socialNetworks {
        title
        url
      }
    }
  }
`;
