import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store";
import * as gtag from "../lib/gtag";
import { Notifications } from "@mantine/notifications";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "dark",
            }}
          >
            <Notifications position="top-right" style={{}} />
            <Component {...pageProps} />
          </MantineProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
