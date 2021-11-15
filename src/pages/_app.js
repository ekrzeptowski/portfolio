// import App from 'next/app'
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";

import { init } from "@socialgouv/matomo-next";

import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";

import config from "../config";

import "normalize.css";
import "../components/layout.scss";
import { useEffect } from "react";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

function MyApp({
  Component,
  pageProps,
  router: { asPath, defaultLocale, locale, locales, route },
}) {
  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
  }), [];
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${config.title}`}
        defaultTitle={config.title}
        canonical={route !== "/404" && `${config.siteUrl}${
          locale !== defaultLocale ? "/" + locale : ""
        }${asPath}`}
        languageAlternates={route !== "/404" && locales?.map((pageLocale) => ({
          hrefLang: pageLocale,
          href: `${config.siteUrl}${
            pageLocale !== pageProps?._nextI18Next?.userConfig?.i18n?.defaultLocale
              ? "/" + pageLocale
              : ""
          }${asPath}`,
        }))}
        openGraph={route !== "/404" && {type: 'website'}}
      />
      <Component {...pageProps} />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default appWithTranslation(MyApp);
