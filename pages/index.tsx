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
        <title>Online JSON viewer</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="JSON Viewer - Online convert JSON data to a readable format"
        />
        <meta
          name="keywords"
          content="json, json viewer, json formatter, json validator, online json formatter, json formatter online, json beautifier, json beautify, format json, jsonlint, JSON Checker, JSON Cleaner, json format, format json online"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Jsontool />
      </main>
    </>
  );
}
