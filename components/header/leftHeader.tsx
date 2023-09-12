import {
  createStyles,
  Group,
  Button,
  Menu,
  Space,
  Loader,
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
import { ImportZone } from "../importZone";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { Cloud } from "../cloud";
import { LoginMessage } from "../loginMessage";
import { SaveForm } from "../saveForm";
import { SaveMessage } from "../saveMessage";
import { post } from "@/utils/api";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  linkButton: {
    color: theme.colors.dark[0],
    fontWeight: 400,

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[6],
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
  const [windowUrl, setWindowURl] = useState("");
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
      const formattedJSON = prettier.format(inputData, {
        parser: "json",
        tabWidth: 4,
        printWidth: 30,
        plugins: [parserBabel],
      });
      // const jsonData = JSON.stringify(data, null, 2);

      // Create a Blob object with the JSON data
      const blob = new Blob([formattedJSON], { type: "application/json" });

      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.json"; // Set the filename for the downloaded file
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof Error) {
        // dispatch(setInputError(error.message));
        // dispatch(setOutputData(""));
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
        dispatch(setInputError(error.message));
        dispatch(setOutputData(""));
      }
    }
  };

  const handleFormat = () => {
    try {
      const formattedJSON = prettier.format(inputData, {
        parser: "json",
        tabWidth: 4,
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
        dispatch(setInputError(error.message));
        dispatch(setOutputData(""));
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
      const response = await post("/api/saveAndUpdate", requestData);
      setWindowURl(`${window.location.origin}/?id=${response.data.id}`);
      router.push({
        pathname: "/",
        query: { id: response.data.id },
      });

      dispatch(setSavedFileData({json: inputData}));
      
      type === "update"
        ? notifications.show({ message: response.message, color: "green" })
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
        {id ? (
          <Menu shadow="md" width={150}>
            <Button
              className={classes.linkButton}
              onClick={(e) => handleSave(e, "update")}
              variant="subtle"
              size="xs"
            >
              {isSaveLoading && (
                <>
                  <Loader size="1rem" /> <Space w="xs" />
                </>
              )}
              Save <Space w="xs" />
              <Menu.Target>
                <IconChevronDown
                  onClick={(e) => e.stopPropagation()}
                  size={14}
                />
              </Menu.Target>
            </Button>

            <Menu.Dropdown>
              <Menu.Item onClick={(e) => handleSave(e, "update")}>
                Save
              </Menu.Item>
              <Menu.Item
                onClick={(e) =>
                  status === "authenticated"
                    ? saveFormOpen()
                    : handleSave(e, "new")
                }
              >
                Save As New
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button
            className={classes.linkButton}
            onClick={(e) =>
              status === "authenticated" ? saveFormOpen() : handleSave(e, "new")
            }
            variant="subtle"
            size="xs"
          >
            Save
          </Button>
        )}
      </Group>
      <ImportZone opened={importOpened} open={importOpen} close={importClose} />
      <SaveForm
        opened={saveFormOpened}
        open={saveFormOpen}
        close={saveFormClose}
      />
      <SaveMessage
        opened={saveMessageOpened}
        open={saveMessageOpen}
        close={saveMessageClose}
        windowUrl={windowUrl}
      />
      <Cloud opened={cloudOpened} open={cloudOpen} close={cloudClose} />
      <LoginMessage
        opened={loginMessageOpened}
        open={loginMessageOpen}
        close={loginMessageClose}
      />
    </>
  );
};

export default LeftHeader;
