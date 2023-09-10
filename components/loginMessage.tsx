import { Text, Title, Button, Stack, Modal } from "@mantine/core";

export function LoginMessage({ opened, open, close }) {
  return (
    <Modal size={"md"} opened={opened} onClose={close} title={"LogIn"} centered>
      <Stack>
        <Title order={2}>Welcome Back!</Title>
        <Text fz="lg">Login to unlock full potential of JSON Viewer!</Text>
        <Button type="submit" fullWidth>
          LogIn
        </Button>
      </Stack>
    </Modal>
  );
}
