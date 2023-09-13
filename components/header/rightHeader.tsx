import {
  createStyles,
  Group,
  rem,
  ActionIcon,
  Input,
  Text,
  Button,
  Popover,
  Flex,
  Stack,
} from "@mantine/core";
import {
  IconSettings,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconShare3,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Settings } from "../settings";
import { useDisclosure } from "@mantine/hooks";
import { Share } from "../share";

const useStyles = createStyles((theme) => ({
  customButton: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    }),
  },
}));

const RightHeader = ({}) => {
  const { classes } = useStyles();
  const { status }: any = useSession();
  const { inputData } = useSelector((state: any) => state.dashboard);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isUrlCopied, setUrlCopied] = useState(false);

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

  const handleShare = async () => {
    const requestData = {
      json: inputData,
    };
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(requestData),
      });
      const { data } = await response.json();
      setShareUrl(`${window.location.origin}?id=${data.id}`);
    } catch (error) {
      console.error("Data Save Failed", error);
    }
  };

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
    <>
      <Group>
        {status === "authenticated" && (
          // <Popover width={300} position="bottom" withArrow shadow="md">
          //   <Popover.Target>
          //     <Button
          //       leftIcon={<IconShare3 size="1.2rem" />}
          //       size="xs"
          //       onMouseEnter={handleShare}
          //     >
          //       Share
          //     </Button>
          //   </Popover.Target>
          //   <Popover.Dropdown>
          //     <Stack>
          //       <Text size="sm">
          //         Anyone with this link can edit this json file.
          //       </Text>
          //       <Flex justify="flex-start" align="center">
          //         <Input variant="filled" value={shareUrl} readOnly />
          //         <Button size="xs" onClick={handleCopy}>
          //           {isUrlCopied ? "Copied!" : "Copy link"}
          //         </Button>
          //       </Flex>
          //     </Stack>
          //   </Popover.Dropdown>
          // </Popover>
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
