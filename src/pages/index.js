import React, { createRef } from "react";
import { graphql, Link } from "gatsby";

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
    allStrapiProject,
    allStrapiTechnologyCategory,
  },
}) => {
  const aboutRef = createRef();
  console.log(aboutRef);

  return (
    <Layout offset={aboutRef}>
      <SEO
        title={strapiHome.seo.title}
        description={strapiHome.seo.description}
      />
      <Header bio={strapiHome.bio} />
      <About ref={aboutRef} about={strapiAbout.content[0].content} />
      <Skills skills={allStrapiTechnologyCategory.edges} />
      <Projects projects={allStrapiProject.edges} />
      <Contact contact={strapiGlobal} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiProject {
      edges {
        node {
          title
          technologies {
            title
          }
          description
          link
          github
          coverImage {
            localFile {
              childImageSharp {
                fluid(maxWidth: 640) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    strapiAbout {
      content {
        content
      }
    }
    strapiHome {
      bio
      title
      seo {
        title
        description
      }
    }
    strapiGlobal {
      contactEmail
      contactPhone
      socialNetworks {
        title
        url
      }
    }
    allStrapiTechnologyCategory {
      edges {
        node {
          type
          type_pl
          technologies {
            title
            description
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
