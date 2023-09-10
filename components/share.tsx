import {
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  Paper,
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
    <Modal size="lg" opened={opened} onClose={close} title="Share" centered>
      <Stack>
        <Text size="lg" weight={500}>
          <Flex justify="flex-start" align="center" columnGap="0.5rem">
            <IconWorld size="1rem" /> Everyone with this link can edit
          </Flex>
        </Text>

        <Flex
          justify="flex-start"
          align="center"
          style={{ paddingBottom: "8rem" }}
        >
          <Input
            icon={<IconUsersGroup size="1rem" />}
            value="Everyone"
            readOnly
          />
          <Select
            data={[
              { value: "edit", label: "Edit (Make any changes)" },
              { value: "view", label: "View (Cannot make changes)" },
            ]}
          />
        </Flex>
        <Divider labelPosition="center" my="lg" />
        <Flex justify="flex-end" align="center">
          <Button size="sm" onClick={handleCopy}>
            {isUrlCopied ? "Copied!" : "Copy link"}
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
