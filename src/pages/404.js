import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import NotFound from "../svg/not-found.svg";
const NotFoundPage = () => (
  <Layout style={{ paddingTop: 66 }}>
    <SEO title="404: Not found" />
    <div style={{ display: "flex", justifyContent: "center" }}>
      <NotFound style={{ maxWidth: 600, flexGrow: 1 }} />
    </div>
  </Layout>
);

export default NotFoundPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
