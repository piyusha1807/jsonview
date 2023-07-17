import Head from "next/head";
import Image from "next/image";
// import Jsontool from "@/components/jsontool";
import DashboardLayout from "@/components/dashboardLayout";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// const Jsontool = dynamic(
//   () => {
//     return import("../components/dashboardLayout/jsontool");
//   },
//   { ssr: false }
// );

// const DashboardLayout = dynamic(
//   () => {
//     return import("../components/dashboardLayout");
//   },
//   { ssr: false }
// );

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = localStorage.getItem("set-theme");

    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("set-theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("set-theme", "light");
    }
  };

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
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={theme}>
        <DashboardLayout />
      </main>
    </>
  );
}
