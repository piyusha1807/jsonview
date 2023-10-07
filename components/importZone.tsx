import { useRef, useState } from "react";
import {
  Text,
  Group,
  Button,
  createStyles,
  rem,
  Modal,
  Flex,
  Stack,
} from "@mantine/core";
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
  setSavedFileData,
} from "@/store/actions/dashboardAction";
import * as gtag from "../lib/gtag";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import { notifications } from "@mantine/notifications";
import { get } from "@/utils/api";

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

const importButtons = [
  { id: "d2f20558-b9c2-40c1-beea-e225b160607e", name: "User JSON" },
  { id: "ade39eea-a638-44f9-b085-a3b40f66c4c5", name: "Tweet JSON" },
  { id: "b2c8a71b-3e31-48c9-9ac9-232f21a09d4f", name: "Github JSON" },
];

const ImportZone = ({ opened, open, close }) => {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleEditorChange = (value) => {
    try {
      const formattedJSON = prettier.format(value, {
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
      if (value) {
        obj = JSON.parse(value);
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
      }
    }
  };

  const handleImport = () => {
    if (uploadStatus === "uploaded" && file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const fileContent = event.target.result;
          handleEditorChange(fileContent);
          dispatch(setSavedFileData({}));
        } catch (error) {
          notifications.show({ message: error.message, color: "red" });
        }
      };
      reader.readAsText(file);
    }
  };

  const getData = async (id) => {
    try {
      setIsLoading(true);
      const { data } = await get(`/api/getFile/?id=${id}`);

      handleEditorChange(data.json);
      dispatch(setSavedFileData({}));
    } catch (error) {
      notifications.show({ message: error.message, color: "red" });
    } finally {
      setIsLoading(false);
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
        <Stack spacing="xs">
          <Text>Not have JSON? Try it out:</Text>
          <Flex justify="space-between" align="center">
            {importButtons.map((button) => {
              return (
                <Button
                  size="xs"
                  variant="light"
                  key={button.id}
                  loading={isLoading}
                  onClick={() => getData(button.id)}
                >
                  {button.name}
                </Button>
              );
            })}
          </Flex>
        </Stack>
      </div>
    </Modal>
  );
};

export default ImportZone;
