import { createStyles, Group, Button, Menu, Title } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { notifications } from '@mantine/notifications';
import Minify from '../minify';

const ImportZone = dynamic(() => import('../importZone'), {
  ssr: false
});
const Cloud = dynamic(() => import('../cloud'), {
  ssr: false
});
const LoginMessage = dynamic(() => import('../loginMessage'), {
  ssr: false
});
const SaveForm = dynamic(() => import('../saveForm'), {
  ssr: false
});
const SaveMessage = dynamic(() => import('../saveMessage'), {
  ssr: false
});
const Share = dynamic(() => import('../share'), {
  ssr: false
});

const useStyles = createStyles((theme) => ({
  linkButton: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    fontWeight: 400,
    paddingLeft: 12,
    paddingRight: 12,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    })
  },
  customButton: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    fontWeight: 400,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]
    })
  }
}));

const LeftHeader = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { inputData } = useSelector((state: any) => state.dashboard);
  const { status }: any = useSession();

  const [importOpened, { open: importOpen, close: importClose }] = useDisclosure(false);
  const [minifyOpened, { open: minifyOpen, close: minifyClose }] = useDisclosure(false);
  const [saveFormOpened, { open: saveFormOpen, close: saveFormClose }] = useDisclosure(false);
  const [saveMessageOpened, { open: saveMessageOpen, close: saveMessageClose }] =
    useDisclosure(false);
  const [cloudOpened, { open: cloudOpen, close: cloudClose }] = useDisclosure(false);
  const [loginMessageOpened, { open: loginMessageOpen, close: loginMessageClose }] =
    useDisclosure(false);
  const [shareOpened, { open: openShare, close: closeShare }] = useDisclosure(false);

  const handleDownload = () => {
    try {
      const blob = new Blob([inputData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'data.json';
      link.click();

      // Clean up the temporary URL
      URL.revokeObjectURL(url);
    } catch (error) {
      if (error instanceof Error) {
        notifications.show({ message: error.message, color: 'red' });
      }
    }
  };

  return (
    <>
      <Group sx={{ height: '100%' }} spacing={0}>
        <Title
          order={4}
          onClick={() => router.push('/')}
          style={{ cursor: 'pointer', marginRight: '8px' }}
        >
          JSON Viewer
        </Title>
        <Menu trigger="hover" openDelay={100} closeDelay={400} width={130}>
          <Menu.Target>
            <Button
              className={classes.linkButton}
              variant="subtle"
              size="xs"
              rightIcon={<IconChevronDown size={14} />}
            >
              File
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={importOpen}>Import</Menu.Item>
            <Menu.Item onClick={handleDownload}>Export</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu trigger="hover" openDelay={100} closeDelay={400} width={150}>
          <Menu.Target>
            <Button
              className={classes.linkButton}
              variant="subtle"
              size="xs"
              rightIcon={<IconChevronDown size={14} />}
            >
              Tools
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={minifyOpen}>Minify JSON</Menu.Item>
            <Menu.Item onClick={handleDownload}>Compare JSON</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Button className={classes.linkButton} onClick={cloudOpen} variant="subtle" size="xs">
          Saved files
        </Button>
        <Button className={classes.linkButton} onClick={saveFormOpen} variant="subtle" size="xs">
          {status === 'authenticated' ? 'Save' : 'Save & Share'}
        </Button>
        {status === 'authenticated' && (
          <Button
            className={classes.linkButton}
            variant="subtle"
            size="xs"
            onClick={status === 'authenticated' ? openShare : saveMessageOpen}
          >
            Share
          </Button>
        )}
      </Group>
      {importOpened && <ImportZone opened={importOpened} open={importOpen} close={importClose} />}
      {minifyOpened && <Minify opened={minifyOpened} open={importOpen} close={minifyClose} />}
      {saveFormOpened && (
        <SaveForm
          opened={saveFormOpened}
          open={saveFormOpen}
          saveMessageOpen={saveMessageOpen}
          close={saveFormClose}
        />
      )}
      {saveMessageOpened && (
        <SaveMessage
          opened={saveMessageOpened}
          open={saveMessageOpen}
          close={saveMessageClose}
          windowUrl={window.location.href}
        />
      )}
      {cloudOpened && <Cloud opened={cloudOpened} close={cloudClose} />}
      {shareOpened && <Share opened={shareOpened} open={openShare} close={closeShare} />}
      {loginMessageOpened && (
        <LoginMessage
          opened={loginMessageOpened}
          open={loginMessageOpen}
          close={loginMessageClose}
        />
      )}
    </>
  );
};

export default LeftHeader;
