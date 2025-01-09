import {
  Textarea,
  Button,
  Stack,
  Modal,
  Box,
  CopyButton,
  Tooltip,
  ActionIcon,
  rem
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconCheck, IconCopy } from '@tabler/icons-react';

const Minify = ({ opened, close }: any) => {
  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData } = dashboard;

  const [minifiedJson, setMinifiedJson] = useState(inputData);

  const handleDownload = () => {
    try {
      const blob = new Blob([minifiedJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'data.json';
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({ message: error.message, color: 'red' });
      }
    }
  };

  const handleMinify = () => {
    try {
      const minifiedInputJson = inputData ? JSON.stringify(JSON.parse(inputData)) : '';
      setMinifiedJson(minifiedInputJson);
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({ message: error.message, color: 'red' });
      }
    }
  };

  useEffect(() => {
    handleMinify();
  });

  return (
    <Modal size={'md'} opened={opened} onClose={close} title="Minify JSON" centered={true}>
      <Stack>
        <Box style={{ position: 'relative' }}>
          <Textarea placeholder="Your json..." value={minifiedJson} radius="md" minRows={15} />
          <CopyButton value={minifiedJson} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                <ActionIcon
                  color={copied ? 'teal' : 'gray'}
                  variant="filled"
                  onClick={copy}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    padding: '2px',
                    minWidth: 'unset',
                    width: '30px',
                    height: '30px'
                  }}
                >
                  {copied ? (
                    <IconCheck style={{ width: rem(16) }} />
                  ) : (
                    <IconCopy style={{ width: rem(16) }} />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Box>
        <Button type="submit" radius="md" onClick={handleDownload}>
          Download Minified JSON
        </Button>
      </Stack>
    </Modal>
  );
};

export default Minify;
