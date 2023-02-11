import Head from "next/head";
import Image from "next/image";

import dynamic from "next/dynamic";

const Jsontool = dynamic(
  () => {
    return import("../components/jsontool");
  },
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Online JSON Viewer</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Online JSON Viewer helps the user to format data and view it as a tree structure. This allows users to identify errors and fix them quickly."
        />
        <meta
          name="keywords"
          content="json, json viewer, json formatter, json validator, online json formatter, json formatter online, json beautifier, json beautify, format json, jsonlint, JSON Checker, JSON Cleaner, json format, format json online, jsonviewer.info"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Jsontool />
      </main>
    </>
  );
}
