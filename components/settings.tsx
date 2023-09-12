import { Modal, Switch } from "@mantine/core";

export function Settings({ opened, open, close }) {
  return (
    <Modal opened={opened} onClose={close} title="Settings" centered>
      <Switch
        label="Light Theme"
      />
        <Switch
          label="Live Preview"
        />
      <Switch
        label="Display Children Count"
        // description="Toggle this switch to make the file accessible to everyone."
        // checked={}
        // onClick={() =>}
      />
    </Modal>
  );
}
