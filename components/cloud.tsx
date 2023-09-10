import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { deleteApi, get } from "@/utils/api";
import { formatTimestamp } from "@/utils/utils";
import {
  Table,
  Paper,
  PaperProps,
  Modal,
  Loader,
  ActionIcon,
  createStyles,
  Flex,
  Tooltip,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconExternalLink, IconLink, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  customButton: {
    color: theme.colors.dark[0],

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[6],
    }),
  },
}));

export function Cloud({ opened, open, close }) {
  const { classes } = useStyles();
  const [isCopied, copy] = useCopyToClipboard();

  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (opened) {
      getData();
    }
  }, [opened]);

  useEffect(() => {
    if (isCopied) {
      notifications.show({
        message: "Link copied to clipboard",
        color: "green",
      });
    }
  }, [isCopied]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await get("/api/getData");
      setData(response.data);
    } catch (error) {
      notifications.show({ message: error.message, color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = (id) => {
    window.open(`${window.location.origin}?id=${id}`, "_blank");
  };

  const handleDelete = async (id) => {
    try {
      setDeleteId(id);
      const response = await deleteApi(`/api/deleteFile/?id=${id}`);

      setData((prevData) => prevData.filter((item) => item.id !== id));
      notifications.show({ message: response.message, color: "green" });
    } catch (error) {
      notifications.show({ message: error.message, color: "red" });
    } finally {
      setDeleteId(null);
    }
  };

  const formatNameComments = (value, columnName) => {
    return (
      <Tooltip label={value} width={220} position="right" withArrow multiline>
        <Text
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100px",
          }}
        >
          {value}
        </Text>
      </Tooltip>
    );
  };

  const formatTruthy = (value) => {
    return value ? "Enabled" : "Disabled";
  };

  return (
    <Modal
      size="75%"
      opened={opened}
      onClose={close}
      title={"Saved Files"}
      centered
    >
      <Table highlightOnHover withBorder>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Comments</th>
            <th>Created</th>
            <th>Last Modified</th>
            <th>Public View</th>
            <th>Public Edit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <Loader size="1rem" />}
          {!isLoading &&
            data &&
            data.map((element) => {
              return (
                <tr key={element.id}>
                  <td>{formatNameComments(element.fileName, "filename")}</td>
                  <td>{formatNameComments(element.comments, "comments")}</td>
                  <td>{formatTimestamp(element.createdAt)}</td>
                  <td>{formatTimestamp(element.lastModifiedAt)}</td>
                  <td>{formatTruthy(element.globalView)}</td>
                  <td>{formatTruthy(element.globalEdit)}</td>
                  <td>
                    <Flex
                      justify="flex-start"
                      align="center"
                      columnGap="0.5rem"
                    >
                      <ActionIcon
                        className={classes.customButton}
                        onClick={() => handleOpen(element.id)}
                      >
                        <IconExternalLink size="1.5rem" color="#339AF0" />
                      </ActionIcon>
                      <ActionIcon
                        className={classes.customButton}
                        onClick={() =>
                          deleteId !== element.id && handleDelete(element.id)
                        }
                      >
                        {deleteId === element.id ? (
                          <Loader size="1rem" />
                        ) : (
                          <IconTrash size="1.5rem" color="#FF6B6B" />
                        )}
                      </ActionIcon>
                      <ActionIcon
                        className={classes.customButton}
                        onClick={() =>
                          copy(`${window.location.origin}?id=${element.id}`)
                        }
                      >
                        <IconLink size="1.5rem" color="#69DB7C" />
                      </ActionIcon>
                    </Flex>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Modal>
  );
}
