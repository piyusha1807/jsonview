import { setSettingsConfig } from "@/store/actions/dashboardAction";
import { Modal, Stack, Switch, useMantineColorScheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

const Settings = ({ opened, open, close }) => {
  const dispatch = useDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { displayChildrenCount } = useSelector(
    (state: any) => state.dashboard.settingsConfig
  );

  const light = colorScheme === "light";

  const handleThemeChange = (e) => {
    toggleColorScheme();
    localStorage.setItem("theme", e ? "light" : "dark");
  };

  return (
    <Modal opened={opened} onClose={close} title="Settings" centered>
      <Stack>
        <Switch
          label="Light Theme"
          checked={light}
          onChange={(e) => handleThemeChange(e.currentTarget.checked)}
        />
        <Switch
          label="Display Children Count"
          checked={displayChildrenCount}
          onChange={(e) =>
            dispatch(
              setSettingsConfig({
                displayChildrenCount: e.currentTarget.checked,
              })
            )
          }
        />
      </Stack>
    </Modal>
  );
};

export default Settings;
