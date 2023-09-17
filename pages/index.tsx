import Head from "next/head";
import DashboardLayout from "@/components/dashboardLayout";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputData,
  setInputError,
  setOutputData,
  setSavedFileData,
} from "@/store/actions/dashboardAction";
import { get } from "@/utils/api";
import { notifications } from "@mantine/notifications";
import { useMantineColorScheme } from "@mantine/core";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { colorScheme } = useMantineColorScheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, [id]);

  const getData = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await get(`/api/getFile/?id=${id}`);

      handleEditorChange(data.json);
      dispatch(setSavedFileData(data));
      // notifications.show({ message: response.message, color: "green" });
    } catch (error) {
      notifications.show({ message: error.message, color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange: any = (value: string) => {
    try {
      dispatch(setInputError(""));
      dispatch(setInputData(value));

      let obj = "";
      if (value) {
        obj = JSON.parse(value);
      }
      dispatch(setOutputData(obj));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setInputError(error.message));
      }
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
          // eslint-disable-next-line
          content="json prettify online, json formatter check, json lint online, json reader online, how to view json files, json format checker, check json validity, jsonformatter online, json syntax checker, json formatter beautify, json string formatter, how to format json files, json path finder, json pretty online, code beautify json, json formatter online free, sublime json formatter, json diff online, vscode format json, json formatter chrome extension"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={colorScheme}>
        <DashboardLayout />
      </main>
    </>
  );
}
