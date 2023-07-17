import { useRef, useState } from "react";
import { Text, Group, Button, createStyles, rem, Flex } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconCloudUpload,
  IconX,
  IconDownload,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { setInputData } from "@/store/actions/dashboardAction";

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
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: rem(-20),
  },
}));

export function DropzoneButton({ onClose }) {
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
      reader.onload = (event) => {
        const fileContent = event.target.result;
        dispatch(setInputData(fileContent));
        onClose();
      };
      reader.readAsText(file);
    }
  };

  return (
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
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black
                  }
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
  );
}
