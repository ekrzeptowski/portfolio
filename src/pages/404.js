import React from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { NextSeo } from "next-seo";

import Layout from "../components/layout";
import NotFound from "../svg/not-found.svg";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Layout style={{ paddingTop: 66 }}>
      <NextSeo noindex nofollow title={t("Page not found")} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NotFound style={{ maxWidth: 600, flexGrow: 1 }} />
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
