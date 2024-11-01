import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { Notifications } from '@mantine/notifications';
import store from '../store';
import * as gtag from '../lib/gtag';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme) {
      setColorScheme(theme);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              theme={{
                fontFamily: 'Source Sans Pro, sans-serif',
                fontFamilyMonospace: 'Source Sans Pro, sans-serif',
                headings: { fontFamily: 'Source Sans Pro, sans-serif' },
                colorScheme: colorScheme,
                fontSizes: {
                  xs: '0.85rem',
                  sm: '0.9rem',
                  md: '1rem',
                  lg: '1.1rem',
                  xl: '1.2rem'
                }
              }}
              withGlobalStyles
              // withNormalizeCSS
            >
              <Notifications position="top-right" />
              <Component {...pageProps} />
            </MantineProvider>
          </ColorSchemeProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
