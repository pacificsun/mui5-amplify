import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import Amplify, { Auth } from "aws-amplify";
import type { AppProps } from "next/app";
import awsconfig from "../aws-exports";
import AuthContext from "../context/AuthContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

Amplify.configure({ ...awsconfig, ssr: true });

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const emotionCache = clientSideEmotionCache;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Reddit Clone</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthContext>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthContext>
    </CacheProvider>
  );
}
