import { Modal } from "@mantine/core";

export function Settings({ opened, open, close }) {
  return (
    <Modal opened={opened} onClose={close} title="Settings" centered>
      Settings
    </Modal>
  );
}
