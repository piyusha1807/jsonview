import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { ActionIcon, Code, Modal, Tooltip, Text } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";

const SaveMessage = ({ opened, open, close, windowUrl }: any) => {
  const [isCopied, copy] = useCopyToClipboard();

  return (
    <Modal
      size="xl"
      opened={opened}
      onClose={close}
      title="Your JSON file is saved!"
    >
      <>
        <Text fz="md">You can access the file directly at</Text>
        <div style={{ display: "flex" }}>
          <Code color="red">
            <Text fz="sm">{windowUrl}</Text>
          </Code>
          <Tooltip
            label={isCopied ? "Copied" : "Copy"}
            withArrow
            position="right"
          >
            <ActionIcon
              color={isCopied ? "teal" : "gray"}
              onClick={() => copy(windowUrl)}
            >
              {isCopied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
            </ActionIcon>
          </Tooltip>
        </div>
      </>
    </Modal>
  );
};

export default SaveMessage;
