/* eslint-disable @next/next/no-img-element */
import { NextSeo } from "next-seo";

import ReactMarkdown from "react-markdown";
import { RepoCardFetch } from "react-repo-widget";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../components/layout";
import { SectionTitle } from "../../components/typography";
import { getProjectDescription, getProjectSlugs } from "../../lib/contentful";

import liquidTags from "../../plugins/github";

import * as styles from "../../templates/project.module.scss";
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
  image: ({ src, alt }) => {
    return <img src={src} alt={alt} className={styles.coverImage} />;
  }
};

function Project({
  article: { body_markdown, cover_image, description, title },
}) {
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ images: [{ url: cover_image, alt: `${title} preview` }] }}
      />
      <main className="container">
        <section className={styles.post}>
          <SectionTitle>{title}</SectionTitle>
          <img src={cover_image} alt="Cover" className={styles.coverImage} />
          <div className={styles.content}>
            <ReactMarkdown plugins={[liquidTags]} renderers={renderers}>
              {body_markdown}
            </ReactMarkdown>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticPaths({ locales }) {
  const projects = (await getProjectSlugs("en")) ?? [];
  const paths = [];
  locales.forEach((locale) => {
    projects.forEach((slug) => {
      paths.push({
        params: {
          slug,
        },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps({ params, locale }) {
  const devToPost = await fetch(
    `https://dev.to/api/articles/${process.env.DEVTO_USER}/${params.slug}`,
  );
  const res = await devToPost.json();

  const project = await getProjectDescription(params.slug, locale);

  const body_markdown =
    locale === "en" ? res.body_markdown : project.longDescription ?? {};

  // Pass post project to the page via props
  return {
    props: {
      article: {
        body_markdown,
        cover_image: res.cover_image,
        description: project.description,
        title: res.title,
      },
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Project;
