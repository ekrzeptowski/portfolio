import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image"
import SEO from "../components/seo";
import { SectionTitle } from "../components/typography";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <SectionTitle>Test header</SectionTitle>
  </Layout>
);

export default IndexPage;
