import { ActionIcon, Code, Modal, Tooltip, Text } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

const SaveMessage = ({ opened, open, close, windowUrl }: any) => {
  const [isCopied, copy] = useCopyToClipboard();

  return (
    <Modal size="xl" opened={opened} onClose={close} title="JSON file saved!">
      <>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '8px' }}>
          <Text fz="sm">Your file is now publicly accessible. Share this link:</Text>
          <div style={{ display: 'flex' }}>
            <Code color="blue">
              <Text fz="md">{windowUrl}</Text>
            </Code>
            <Tooltip label={isCopied ? 'Copied' : 'Copy'} withArrow position="right">
              <ActionIcon color={isCopied ? 'teal' : 'gray'} onClick={() => copy(windowUrl)}>
                {isCopied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default SaveMessage;
