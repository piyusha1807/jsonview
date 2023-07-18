import {
  createStyles,
  Header,
  Group,
  Box,
  Burger,
  rem,
  ActionIcon,
  Input,
  Button,
  Modal,
} from "@mantine/core";
//   import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconSettings,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconDownload,
  IconShare3,
} from "@tabler/icons-react";
import { DropzoneButton } from "./dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setInputData,
  setInputError,
  setOutputData,
} from "@/store/actions/dashboardAction";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";

const useStyles = createStyles((theme) => ({
  customHeader: {
    backgroundColor: theme.colors.dark[7],
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
  },
  linkButton: {
    color: theme.colors.dark[0],
    fontWeight: 400,

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[6],
    }),
  },
  customButton: {
    color: theme.colors.dark[0],

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[6],
    }),
  },
}));

const HeaderMenu = ({ }) => {
  const { classes, theme } = useStyles();
  const [dropZoneOpened, { open: dropZoneOpen, close: dropZoneClose }] =
    useDisclosure(false);
  const [settingsOpened, { open: settingsOpen, close: settingsClose }] =
    useDisclosure(false);
  const dispatch = useDispatch();
  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData, outputData } = dashboard;

  const [isFullScreen, setIsFullScreen] = useState(false);

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
      console.log({ inputData });
      const formattedJSON = prettier.format(inputData, {
        parser: "json",
        tabWidth: 4,
        printWidth: 30,
        plugins: [parserBabel],
      });
      dispatch(setInputError(""));
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

  const handleFullScreen = () => {
    const element = document.documentElement;

    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <Modal
        opened={dropZoneOpened}
        onClose={dropZoneClose}
        title="Import JSON"
        centered
      >
        <DropzoneButton onClose={dropZoneClose} />
      </Modal>
      <Modal
        opened={settingsOpened}
        onClose={settingsClose}
        title="Settings"
        centered
      ></Modal>
      <Header className={classes.customHeader} height={50} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Group sx={{ height: "100%" }} spacing={0}>
            <Button
              className={classes.linkButton}
              onClick={dropZoneOpen}
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
            <Button className={classes.linkButton} variant="subtle" size="xs">
              Save
            </Button>
          </Group>

          <Group>
            <Button leftIcon={<IconShare3 size="1.2rem" />} size="xs">
              Share
            </Button>
            <ActionIcon
              className={classes.customButton}
              onClick={handleFullScreen}
            >
              {isFullScreen ? (
                <IconArrowsMinimize size="1.5rem" />
              ) : (
                <IconArrowsMaximize size="1.5rem" />
              )}
            </ActionIcon>
            <ActionIcon className={classes.customButton} onClick={settingsOpen}>
              <IconSettings size="1.5rem" />
            </ActionIcon>
          </Group>
        </Group>
      </Header>
    </>
  );
};

export default HeaderMenu;
