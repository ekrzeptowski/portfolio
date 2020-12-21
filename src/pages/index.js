import React, { createRef } from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Header from "../components/sections/Header";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";

const IndexPage = ({
  data: {
    strapiAbout,
    strapiHome,
    strapiGlobal,
    allContentfulProject,
    allContentfulTechnologyCategory,
  },
}) => {
  const aboutRef = createRef();

  return (
    <Layout offset={aboutRef}>
      <SEO
      // title={strapiHome.seo.title}
      // description={strapiHome.seo.description}
      />
      {/* <Header bio={strapiHome.bio} /> */}
      {/* <About ref={aboutRef} about={strapiAbout.aboutText} /> */}
      <Skills skills={allContentfulTechnologyCategory.edges} />
      <Projects projects={allContentfulProject.edges} />
      {/* <Contact contact={strapiGlobal} /> */}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery($language: String) {
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
          link
          repo
          preview {
            localFile {
              childImageSharp {
                fluid(maxWidth: 840) {
                  ...GatsbyImageSharpFluid
                }
              }
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
  }
`;
