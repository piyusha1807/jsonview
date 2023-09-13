import { Modal, Switch, useMantineColorScheme } from "@mantine/core";

export function Settings({ opened, open, close }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const light = colorScheme === 'light';

  const handleThemeChange =(e) => {
    toggleColorScheme()
    localStorage.setItem('theme', e ? 'light' : 'dark')
  }

  return (
    <Modal opened={opened} onClose={close} title="Settings" centered>
      <Switch
        label="Light Theme"
        checked={light}
        onChange={(e) => handleThemeChange(e.currentTarget.checked)}
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
