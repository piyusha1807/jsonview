import Head from 'next/head';
import { useMantineColorScheme } from '@mantine/core';
import LandingPageComponent from '@/components/landingPageComonent';

export default function Home() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <Head>
        <title>JSON Viewer Online: Open, view, Format, and Share JSON File</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="JSON Viewer Online is a free and easy-to-use web app for developers to import, create, edit, view, format, minify, debug, save, and share json data."
        />
        <meta
          name="keywords"
          content="jsonviewer, json prettify online, json formatter check, json lint online, json reader online, how to view json files, json format checker, check json validity, jsonformatter online, json syntax checker, json formatter beautify, json string formatter, how to format json files, json path finder, json pretty online, code beautify json, json formatter online free, sublime json formatter, json diff online, vscode format json, json formatter chrome extension"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="JSON Viewer Online: Open, view, Format, and Share JSON File"
        />
        <meta property="og:url" content="https://jsonviewer.info" />
        <meta
          property="og:description"
          content="JSON Viewer Online is a free and easy-to-use web app for developers to import, create, edit, view, format, minify, debug, save, and share json data."
        />
        <meta property="og:image" content="https://i.imgur.com/Hh1vjr7.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@username" />
        <meta
          name="twitter:title"
          content="JSON Viewer Online: Open, view, Format, and Share JSON File"
        />
        <meta
          name="twitter:description"
          content="JSON Viewer Online is a free and easy-to-use web app for developers to import, create, edit, view, format, minify, debug, save, and share json data."
        />
        <meta name="twitter:image" content="https://i.imgur.com/Hh1vjr7.png" />
        <link rel="canonical" href="https://jsonviewer.info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={colorScheme}>
        <LandingPageComponent />
      </main>
    </>
  );
}
