import {
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { IconWorld, IconUsersGroup } from "@tabler/icons-react";
import { useState } from "react";

export function Share({ opened, open, close }) {
  const [isUrlCopied, setUrlCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if ("clipboard" in navigator) {
        navigator.clipboard.writeText(shareUrl);
      } else {
        document.execCommand("copy", true, shareUrl);
      }
      setUrlCopied(true);
      setTimeout(() => {
        setUrlCopied(false);
      }, 3000);
    } catch (error) {}
  };
  return (
    <Modal size="md" opened={opened} onClose={close} centered>
      <Stack>
      <Flex justify="space-between" align="center">
        <Text size="lg" weight={500}>Share File</Text>
        <SegmentedControl
          data={[
            { label: 'Private', value: 'private' },
            { label: 'Public', value: 'public' },
          ]}
        />
      </Flex>
      <Paper p="xl" withBorder>
      <Stack>
        
          <Flex justify="flex-start" align="center" columnGap="0.5rem">
            <IconWorld size="1.25rem" /> <Text size="lg" weight={500}>Everyone with this link can edit</Text>
          </Flex>
        
        <Flex justify="space-between" align="center">
          <Text size="lg" weight={500}>Permission</Text>
          <SegmentedControl
            data={[
              { label: 'Edit', value: 'edit' },
              { label: 'View', value: 'view' },
            ]}
          />
        </Flex>
          {/* <Select
            data={[
              { value: "edit", label: "Edit (Make any changes)" },
              { value: "view", label: "View (Cannot make changes)" },
            ]}
          /> */}
          </Stack>
          </Paper>
        <Flex justify="flex-end" align="center">
          <Button size="sm" onClick={handleCopy}>
            Save Changes
          </Button>
          <Button size="sm" onClick={handleCopy}>
            {isUrlCopied ? "Copied!" : "Copy link"}
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
