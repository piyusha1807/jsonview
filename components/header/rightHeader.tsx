import { createStyles, ActionIcon, Button, Flex, Input, Avatar } from '@mantine/core';
import {
  IconSettings,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconShare3,
  IconSearch,
  IconLogin
} from '@tabler/icons-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useDisclosure } from '@mantine/hooks';
import { AuthenticationForm } from '../authentication';

const Settings = dynamic(() => import('../settings'), {
  ssr: false
});
const Share = dynamic(() => import('../share'), {
  ssr: false
});
const UserInfo = dynamic(() => import('../userInfo'), {
  ssr: false
});

const useStyles = createStyles((theme) => ({
  linkButton: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    fontWeight: 400,
    paddingLeft: 8,
    paddingRight: 8,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    })
  },
  customButton: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    })
  }
}));

const RightHeader = ({}) => {
  const { classes } = useStyles();
  const { data: session, status }: any = useSession();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [settingsOpened, { open: openSettings, close: closeSettings }] = useDisclosure(false);
  const [userInfoOpened, { open: userInfoOpen, close: userInfoClose }] = useDisclosure(false);
  const [authFormOpened, { open: authFormOpen, close: authFormClose }] = useDisclosure(false);

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
      <Flex justify="flex-end" align="center" gap="xs">
        <Input
          size="xs"
          placeholder="Search"
          icon={<IconSearch size={16} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <ActionIcon className={classes.customButton} onClick={handleFullScreen}>
          {isFullScreen ? (
            <IconArrowsMinimize size="1.25rem" />
          ) : (
            <IconArrowsMaximize size="1.25rem" />
          )}
        </ActionIcon>
        <ActionIcon className={classes.customButton} onClick={openSettings}>
          <IconSettings size="1.25rem" />
        </ActionIcon>
        {session ? (
          <Avatar
            variant="transparent"
            radius="xl"
            size="sm"
            key={session.user.name}
            name={session.user.name}
            color="initials"
            src={session.user.image}
            alt={session.user.name}
            onClick={userInfoOpen}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <Button className={classes.linkButton} variant="subtle" size="xs" onClick={authFormOpen}>
            Login
          </Button>
        )}
      </Flex>
      {settingsOpened && (
        <Settings opened={settingsOpened} open={openSettings} close={closeSettings} />
      )}
      {userInfoOpened && (
        <UserInfo opened={userInfoOpened} open={userInfoOpen} close={userInfoClose} />
      )}
      {authFormOpened && (
        <AuthenticationForm opened={authFormOpened} open={authFormOpen} close={authFormClose} />
      )}
    </>
  );
};

export default RightHeader;
