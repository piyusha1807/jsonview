import { Box } from '@mantine/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { notifications } from '@mantine/notifications';
import { useMantineColorScheme } from '@mantine/core';
import {
  setInputData,
  setInputError,
  setOutputData,
  setSavedFileData
} from '@/store/actions/dashboardAction';
import { get } from '@/utils/api';
import JsonTool from '../components/jsontool';
import FooterMenu from '../components/footer';
import HeaderMenu from '../components/header';

const JsonToolPage = () => {
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

  useEffect(() => {
    if (!id) {
      getLandingData();
    }
  }, []);

  const getLandingData = async () => {
    try {
      const res = await fetch('/landing.txt');
      const text = await res.text();

      handleEditorChange(text);
    } catch (error) {
      notifications.show({ message: error.message, color: 'red' });
    }
  };

  const getData = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await get(`/api/getFile/?id=${id}`);

      handleEditorChange(data.json);
      dispatch(setSavedFileData(data));
      // notifications.show({ message: response.message, color: "green" });
    } catch (error) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorChange: any = (value: string) => {
    try {
      console.log(value);
      dispatch(setInputError(''));
      dispatch(setInputData(value));

      let obj = '';
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
    <Box>
      <Head>
        <title>JSON Tool - View, Edit, and Share JSON Files Online</title>
        <meta
          name="description"
          content="Use our powerful JSON tool to easily view, edit, and share JSON files. Perfect for developers working with APIs and complex JSON structures."
        />
        <meta
          name="keywords"
          content="JSON tool, JSON viewer, JSON editor, JSON validator, online JSON tool, view JSON files, edit JSON online"
        />
        <link rel="canonical" href="https://yourwebsite.com/json-tool" />
      </Head>
      <main className={colorScheme}>
        <Box className="parent-box">
          <HeaderMenu />
          <JsonTool />
          <FooterMenu />
        </Box>
      </main>
    </Box>
  );
};

export default JsonToolPage;
