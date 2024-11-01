import { useEffect, useState } from 'react';
import {
  Table,
  Paper,
  PaperProps,
  Modal,
  Loader,
  ActionIcon,
  createStyles,
  Flex,
  Text,
  Drawer,
  Tooltip
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconExternalLink, IconLink, IconTrash, IconDatabaseOff } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { deleteApi, get } from '@/utils/api';
import { formatTimestamp } from '@/utils/utils';

const useStyles = createStyles((theme) => ({
  customButton: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    })
  }
}));

const Cloud = ({ opened, open, close }) => {
  const { classes } = useStyles();
  const [isCopied, copy] = useCopyToClipboard();
  const { status }: any = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('files') || '[]');
    setData(storedFiles);
  }, []);

  useEffect(() => {
    if (opened && status === 'authenticated') {
      getData();
    }
  }, [opened]);

  useEffect(() => {
    if (isCopied) {
      notifications.show({
        message: 'Link copied to clipboard',
        color: 'green'
      });
    }
  }, [isCopied]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await get('/api/getData');
      setData(response.data);
    } catch (error) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = (id) => {
    window.open(`${window.location.origin}?id=${id}`, '_blank');
  };

  const handleDelete = async (id) => {
    try {
      setDeleteId(id);
      const response = await deleteApi(`/api/deleteFile/?id=${id}`);

      setData((prevData) => prevData.filter((item) => item.id !== id));
      notifications.show({ message: response.message, color: 'green' });
    } catch (error) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setDeleteId(null);
    }
  };

  const formatNameComments = (value, columnName) => {
    return (
      <Tooltip label={value} width={220} position="right" withArrow multiline>
        <Text
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100px'
          }}
        >
          {value}
        </Text>
      </Tooltip>
    );
  };

  const formatTruthy = (value) => {
    return value ? 'Enabled' : 'Disabled';
  };

  return (
    <Drawer opened={opened} onClose={close} size="xl" title="Saved Files">
      <Table style={{ minHeight: '200px' }} highlightOnHover withBorder>
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
          {isLoading && (
            <tr>
              <td colSpan={7}>
                <Flex direction="column" align="center" justify="center">
                  <Loader size="1rem" />
                </Flex>
              </td>
            </tr>
          )}
          {!isLoading && data && data.length === 0 && (
            <tr style={{ textAlign: 'center' }}>
              <td colSpan={7}>
                <Flex direction="column" align="center" justify="center" gap="sm">
                  <IconDatabaseOff size="2rem" />
                  <Text>No records to show</Text>
                </Flex>
              </td>
            </tr>
          )}
          {!isLoading &&
            data &&
            data.map((element) => {
              return (
                <tr key={element.id} style={{ backgroundColor: element.local ? '#fef7ea' : '' }}>
                  <td>{formatNameComments(element.fileName, 'filename')}</td>
                  <td>{formatNameComments(element.comments, 'comments')}</td>
                  <td>{formatTimestamp(element.createdAt)}</td>
                  <td>{formatTimestamp(element.lastModifiedAt)}</td>
                  <td>{formatTruthy(element.globalAccess?.view)}</td>
                  <td>{formatTruthy(element.globalAccess?.edit)}</td>
                  <td>
                    <Flex justify="flex-start" align="center" columnGap="0.5rem">
                      <Tooltip label="Open in new tab" withArrow>
                        <ActionIcon
                          className={classes.customButton}
                          onClick={() => handleOpen(element.id)}
                        >
                          <IconExternalLink size="1.2rem" color="#339AF0" />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete file" withArrow>
                        <ActionIcon
                          className={classes.customButton}
                          onClick={() => deleteId !== element.id && handleDelete(element.id)}
                        >
                          {deleteId === element.id ? (
                            <Loader size="1rem" />
                          ) : (
                            <IconTrash size="1.2rem" color="#FF6B6B" />
                          )}
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Copy link" withArrow>
                        <ActionIcon
                          className={classes.customButton}
                          onClick={() => copy(`${window.location.origin}?id=${element.id}`)}
                        >
                          <IconLink size="1.2rem" color="#69DB7C" />
                        </ActionIcon>
                      </Tooltip>
                    </Flex>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Drawer>
  );
};

export default Cloud;
