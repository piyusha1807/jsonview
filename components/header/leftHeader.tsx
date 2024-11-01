import {
  createStyles,
  Group,
  Button,
  Menu,
  Space,
  Loader,
  ActionIcon,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputData,
  setInputError,
  setOutputData,
  setMinifyConfig,
  setFormatConfig,
  setSavedFileData,
} from "@/store/actions/dashboardAction";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { post } from "@/utils/api";
import { notifications } from "@mantine/notifications";

const ImportZone = dynamic(() => import("../importZone"), {
  ssr: false,
});
const Cloud = dynamic(() => import("../cloud"), {
  ssr: false,
});
const LoginMessage = dynamic(() => import("../loginMessage"), {
  ssr: false,
});
const SaveForm = dynamic(() => import("../saveForm"), {
  ssr: false,
});
const SaveMessage = dynamic(() => import("../saveMessage"), {
  ssr: false,
});

const useStyles = createStyles((theme) => ({
  linkButton: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
    fontWeight: 400,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
    }),
  },
  customButton: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[8],
    fontWeight: 400,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[3],
    }),
  },
}));

const LeftHeader = ({}) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { inputData } = useSelector((state: any) => state.dashboard);
  const { status }: any = useSession();
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [importOpened, { open: importOpen, close: importClose }] =
    useDisclosure(false);
  const [saveFormOpened, { open: saveFormOpen, close: saveFormClose }] =
    useDisclosure(false);
  const [
    saveMessageOpened,
    { open: saveMessageOpen, close: saveMessageClose },
  ] = useDisclosure(false);
  const [cloudOpened, { open: cloudOpen, close: cloudClose }] =
    useDisclosure(false);
  const [
    loginMessageOpened,
    { open: loginMessageOpen, close: loginMessageClose },
  ] = useDisclosure(false);

  const handleDownload = () => {
    try {
      const blob = new Blob([inputData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "data.json";
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({ message: error.message, color: "red" });
      }
    }
  };

  const handleMinify = () => {
    try {
      dispatch(setInputError(""));
      let minifyInputVal = "";
      if (inputData) {
        minifyInputVal = JSON.stringify(JSON.parse(inputData));
      }
      dispatch(setMinifyConfig());
      dispatch(setInputData(minifyInputVal));

      if (minifyInputVal) {
        minifyInputVal = JSON.parse(minifyInputVal);
      }
      dispatch(setOutputData(minifyInputVal));
      // gtag.event({
      //   action: "minify",
      //   category: "button",
      //   label: "Minify",
      //   value: "minify",
      // });
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({ message: error.message, color: "red" });
      }
    }
  };

  const handleFormat = () => {
    try {
      const formattedJSON = prettier.format(inputData, {
        parser: "json",
        tabWidth: 2,
        printWidth: 30,
        plugins: [parserBabel],
      });
      dispatch(setInputError(""));
      dispatch(setFormatConfig());
      dispatch(setInputData(formattedJSON));

      let obj = "";
      if (inputData) {
        obj = JSON.parse(inputData);
      }
      dispatch(setOutputData(obj));

      // gtag.event({
      //   action: "format",
      //   category: "button",
      //   label: "Format",
      //   value: "format",
      // });
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({ message: error.message, color: "red" });
      }
    }
  };

  const handleSave = async (e, type) => {
    const requestData = {
      json: inputData,
      type: type,
      id: id,
    };

    try {
      setIsSaveLoading(true);
      const { data, message } = await post("/api/saveAndUpdate", requestData);
      router.push({
        pathname: "/",
        query: { id: data.id },
      });

      dispatch(setSavedFileData(data));

      type === "update"
        ? notifications.show({ message: message, color: "green" })
        : saveMessageOpen();
    } catch (error) {
      notifications.show({ message: error.message, color: "red" });
    } finally {
      setIsSaveLoading(false);
    }
  };

  return (
    <>
      <Group sx={{ height: "100%" }} spacing={0}>
        <Button
          className={classes.linkButton}
          onClick={importOpen}
          variant="subtle"
          size="xs"
        >
          Import
        </Button>
        <Button
          className={classes.linkButton}
          onClick={handleDownload}
          variant="subtle"
          size="xs"
        >
          Download
        </Button>
        <Button
          className={classes.linkButton}
          onClick={handleFormat}
          variant="subtle"
          size="xs"
        >
          Format
        </Button>
        <Button
          className={classes.linkButton}
          onClick={handleMinify}
          variant="subtle"
          size="xs"
        >
          Minify
        </Button>
        <Button
          className={classes.linkButton}
          onClick={status === "authenticated" ? cloudOpen : loginMessageOpen}
          variant="subtle"
          size="xs"
        >
          Cloud
        </Button>
        <Menu shadow="md" width={150}>
          <Button
            className={classes.linkButton}
            onClick={(e) => (id ? handleSave(e, "update") : saveFormOpen())}
            variant="subtle"
            size="xs"
            style={id && { paddingRight: 0 }}
          >
            {isSaveLoading && (
              <>
                <Loader size="1rem" /> <Space w="xs" />
              </>
            )}
            Save
            {id && (
              <Menu.Target>
                <ActionIcon
                  className={classes.customButton}
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconChevronDown size={14} />
                </ActionIcon>
              </Menu.Target>
            )}
          </Button>

          <Menu.Dropdown>
            <Menu.Item onClick={(e) => handleSave(e, "update")}>Save</Menu.Item>
            <Menu.Item onClick={(e) => saveFormOpen()}>Save As New</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      {importOpened && (
        <ImportZone
          opened={importOpened}
          open={importOpen}
          close={importClose}
        />
      )}
      {saveFormOpened && (
        <SaveForm
          opened={saveFormOpened}
          open={saveFormOpen}
          saveMessageOpen={saveMessageOpen}
          close={saveFormClose}
        />
      )}
      {saveMessageOpened && (
        <SaveMessage
          opened={saveMessageOpened}
          open={saveMessageOpen}
          close={saveMessageClose}
          windowUrl={window.location.href}
        />
      )}
      {cloudOpened && (
        <Cloud opened={cloudOpened} open={cloudOpen} close={cloudClose} />
      )}
      {loginMessageOpened && (
        <LoginMessage
          opened={loginMessageOpened}
          open={loginMessageOpen}
          close={loginMessageClose}
        />
      )}
    </>
  );
};

export default LeftHeader;
