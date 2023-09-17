import { createStyles, Group, ActionIcon, Button } from "@mantine/core";
import {
  IconSettings,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconShare3,
} from "@tabler/icons-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Settings } from "../settings";
import { useDisclosure } from "@mantine/hooks";
import { Share } from "../share";

const useStyles = createStyles((theme) => ({
  customButton: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
    }),
  },
}));

const RightHeader = ({}) => {
  const { classes } = useStyles();
  const { status }: any = useSession();

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [shareOpened, { open: openShare, close: closeShare }] =
    useDisclosure(false);
  const [settingsOpened, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);

  const handleFullScreen = () => {
    const element = document.documentElement;

    if (isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <Group>
        {status === "authenticated" && (
          <Button
            leftIcon={<IconShare3 size="1.2rem" />}
            size="xs"
            onClick={openShare}
          >
            Share
          </Button>
        )}
        <ActionIcon className={classes.customButton} onClick={handleFullScreen}>
          {isFullScreen ? (
            <IconArrowsMinimize size="1.5rem" />
          ) : (
            <IconArrowsMaximize size="1.5rem" />
          )}
        </ActionIcon>
        <ActionIcon className={classes.customButton} onClick={openSettings}>
          <IconSettings size="1.5rem" />
        </ActionIcon>
      </Group>
      <Settings
        opened={settingsOpened}
        open={openSettings}
        close={closeSettings}
      />
      <Share opened={shareOpened} open={openShare} close={closeShare} />
    </>
  );
};

export default RightHeader;
