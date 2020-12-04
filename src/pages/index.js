import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Header from "../components/sections/Header";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";

const IndexPage = ({}) => {
  const aboutRef = createRef();
  console.log(aboutRef);

  return (
    <Layout offset={aboutRef}>
      <SEO />
      <Header />
      <About ref={aboutRef} />
      <Skills />
      <Projects />
      <Contact />
    </Layout>
  );
};

export default IndexPage;
