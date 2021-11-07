import React from "react";

import Layout from "../components/layout";
// import SEO from "../components/seo";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import NotFound from "../svg/not-found.svg";

const NotFoundPage = () => (
  <Layout style={{ paddingTop: 66 }}>
    {/* <SEO title="404: Not found" /> */}
    <div style={{ display: "flex", justifyContent: "center" }}>
      <NotFound style={{ maxWidth: 600, flexGrow: 1 }} />
    </div>
  </Layout>
);

export default NotFoundPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
