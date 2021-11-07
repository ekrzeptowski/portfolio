import React, { createRef } from "react";

import Layout from "../components/layout";
// import SEO from "../components/seo";

import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Header from "../components/sections/Header";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import {
  getContact,
  getPageSections,
  getProjects,
  getTechnologyCategory,
} from "../lib/contentful";
import { getGitHubRepos } from "../lib/github";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { parsePhoneNumber } from "libphonenumber-js";

const IndexPage = ({ sections, projects, repos, categories, contact }) => {
  const aboutRef = createRef();

  // Dynamic sections creation
  let components = [];
  sections.forEach((section, index) => {
    switch (section.type) {
      case "hero":
        components.push(<Header key={index} bio={section.content} />);
        break;
      case "basicText":
        components.push(
          <About ref={aboutRef} key={index} about={section.content} />,
        );
        break;
      case "skills":
        components.push(<Skills key={index} skills={categories} />);
        break;
      case "projects":
        components.push(
          <Projects key={index} projects={projects} githubUser={repos} />,
        );
        break;
      case "contact":
        components.push(<Contact key={index} contact={contact} />);
        break;
      default:
        break;
    }
  });

  return (
    <Layout offset={aboutRef}>
      {/* <SEO description={contentfulPage.description} lang={language} /> */}
      {components.map((component) => component)}
    </Layout>
  );
};

export default IndexPage;

export async function getStaticProps({ preview = false, locale }) {
  const sections = (await getPageSections("Index", locale)) ?? [];
  const projects = (await getProjects(locale)) ?? [];
  const repos = (await getGitHubRepos()) ?? [];
  const categories = (await getTechnologyCategory(locale)) ?? [];
  const contact = (await getContact()) ?? [];

  // Parse phone number on server side
  const phoneNumber = parsePhoneNumber(contact?.phone);
  contact.phone = phoneNumber.formatInternational();

  return {
    props: {
      sections,
      projects,
      repos,
      categories,
      contact,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
