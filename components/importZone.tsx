import { useRef, useState } from "react";
import { Text, Group, Button, createStyles, rem, Modal } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconCloudUpload,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import {
  setInputData,
  setOutputData,
  setInputError,
  setFormatConfig,
} from "@/store/actions/dashboardAction";
import * as gtag from "../lib/gtag";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: rem(30),
    display: "flex",
    flexFlow: "column",
    rowGap: "1rem",
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  control: {
    position: "absolute",
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: rem(-20),
  },
}));

export function ImportZone({ opened, open, close }) {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDrop = (files: string | any[]) => {
    if (files && files.length > 0) {
      setFile(files[0]);
      setUploadStatus("uploaded");
      setErrorMessage("");
    } else {
      setUploadStatus("error");
      setErrorMessage("No file uploaded");
    }
  };

  const handleReset = () => {
    setFile(null);
    setUploadStatus("idle");
    setErrorMessage("");
  };

  const handleImport = () => {
    if (uploadStatus === "uploaded" && file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const fileContent = event.target.result;
          const formattedJSON = prettier.format(fileContent, {
            parser: "json",
            tabWidth: 2,
            printWidth: 30,
            plugins: [parserBabel],
          });
          dispatch(setInputError(""));
          dispatch(setFormatConfig());
          dispatch(setInputData(formattedJSON));
          close();

          let obj = "";
          if (fileContent) {
            obj = JSON.parse(fileContent);
          }
          dispatch(setOutputData(obj));

          gtag.event({
            action: "import",
            category: "button",
            label: "Import",
            value: "import",
          });
        } catch (error) {
          if (error instanceof Error) {
            dispatch(setInputError(error.message));
            notifications.show({ message: error.message, color: "red" });
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Import JSON" centered>
      <div className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={handleDrop}
          className={classes.dropzone}
          radius="md"
          accept={["application/json"]}
          // maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group position="center">
              {uploadStatus === "uploaded" ? (
                <IconCheck
                  size={rem(50)}
                  color={theme.colors.green[6]}
                  stroke={1.5}
                />
              ) : uploadStatus === "error" ? (
                <IconAlertCircle
                  size={rem(50)}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              ) : (
                <Dropzone.Idle>
                  <IconCloudUpload
                    size={rem(50)}
                    className={classes.icon}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
              )}
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              {uploadStatus === "uploaded" ? (
                <>
                  <Text ta="center" fz="sm" mt="xs" c="dimmed">
                    File uploaded successfully!
                  </Text>
                  <Text fz="lg" mt="xs">
                    {file.name}
                  </Text>
                  <Text fz="xs" mt="xs">
                    Size: {file.size} bytes
                  </Text>
                </>
              ) : uploadStatus === "error" ? (
                <>
                  <Text ta="center" fz="sm" mt="xs" c="dimmed">
                    {errorMessage}
                  </Text>
                  <Button onClick={handleReset} variant="link" size="xs">
                    Try again
                  </Button>
                </>
              ) : (
                <>
                  <Text ta="center" fz="sm" mt="xs" c="dimmed">
                    Click here to upload JSON
                  </Text>
                </>
              )}
            </Text>
          </div>
        </Dropzone>
        <Button onClick={handleImport}>Import</Button>
      </div>
    </Modal>
  );
}
