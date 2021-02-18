import React from "react";
import ReactMarkdown from "react-markdown";

import Layout from "../components/layout";
import SEO from "../components/seo";

import liquidTags from "../plugins/github";

import { RepoCardFetch } from "react-repo-widget";

import styles from "./project.module.scss";
import { SectionTitle } from "../components/typography";
require("react-repo-widget/dist-esm/styles.css");

const renderers = {
  github: ({ value }) => {
    const splitted = value.split("/");
    return <RepoCardFetch login={splitted[0]} reponame={splitted[1]} />;
  },
  link: ({ children, href }) => (
    <a className="link" href={href}>
      {children}
    </a>
  ),
  heading: ({ level, children }) => {
    const Heading = `h${level}`;
    return <Heading className={styles.heading}>{children}</Heading>;
  },
};

export default function Template({
  pageContext, // this prop will be injected by the GraphQL query below.
}) {
  const { article } = pageContext; // data holds your post data
  return (
    <Layout>
      <SEO title={article.title} />
      <main className="container">
        <section className={styles.post}>
          <SectionTitle>{article.title}</SectionTitle>
          <img
            src={article.cover_image}
            alt="Cover"
            className={styles.coverImage}
          />
          <div className={styles.content}>
            <ReactMarkdown plugins={[liquidTags]} renderers={renderers}>
              {article.body_markdown}
            </ReactMarkdown>
          </div>
        </section>
      </main>
    </Layout>
  );
}
