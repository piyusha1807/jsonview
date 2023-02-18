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
          content="json prettify online, json formatter check, json lint online, json reader online, how to view json files, json format checker, check json validity, jsonformatter online, json syntax checker, json formatter beautify, json string formatter, how to format json files, json path finder, json pretty online, code beautify json, json formatter online free, sublime json formatter, json diff online, vscode format json, json formatter chrome extension"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Jsontool />
      </main>
    </>
  );
}
