import { createStyles, Group, Text, rem, Button, HoverCard } from '@mantine/core';
import {
  IconCircleCheck,
  IconCloudCheck,
  IconCloud,
  IconCloudLockOpen,
  IconCloudLock,
  IconMessageDots,
  IconQuestionMark
} from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';

const Feedback = dynamic(() => import('../feedback'), {
  ssr: false
});

const useStyles = createStyles((theme) => ({
  footer: {
    overflow: 'auto',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  myCustomButton: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontWeight: 300,
    fontSize: theme.fontSizes.xs,
    borderRadius: 0,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[3],
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]
    })
  }
}));

function FooterMenu() {
  const router = useRouter();
  const { classes } = useStyles();
  const { status }: any = useSession();

  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData, inputError, savedFileData } = dashboard;

  const [feedbackOpened, { open: feedbackOpen, close: feedbackClose }] = useDisclosure(false);

  function isFilePublic() {
    if (status !== 'authenticated') {
      return true;
    } else if (savedFileData.globalAccess?.view || savedFileData.globalAccess?.edit) {
      return true;
    }

    return false;
  }

  return (
    <>
      <div className={classes.footer}>
        <div className={classes.inner}>
          <Group spacing={0} position="left" noWrap>
            <Button
              leftIcon={
                inputData === savedFileData?.json ? (
                  <IconCloudCheck size="1rem" />
                ) : (
                  <IconCloud size="1rem" />
                )
              }
              className={classes.myCustomButton}
              variant="subtle"
              size="xs"
            >
              {inputData === savedFileData?.json ? 'Saved' : 'Not Saved'}
            </Button>
            <Button
              leftIcon={
                isFilePublic() ? <IconCloudLockOpen size="1rem" /> : <IconCloudLock size="1rem" />
              }
              className={classes.myCustomButton}
              variant="subtle"
              size="xs"
            >
              {isFilePublic() ? 'Public' : 'Private'}
            </Button>
            <Group position="center">
              <HoverCard width={280} shadow="md" withArrow>
                <HoverCard.Target>
                  <Button
                    leftIcon={<IconCircleCheck size="1rem" />}
                    className={classes.myCustomButton}
                    style={{
                      backgroundColor: inputError === '' ? '' : '#E03131',
                      color: inputError === '' ? '' : '#E9ECEF'
                    }}
                    variant="subtle"
                    size="xs"
                  >
                    {inputError === '' ? 'Valid Format' : 'Invalid Format'}
                  </Button>
                </HoverCard.Target>
                {inputError && (
                  <HoverCard.Dropdown>
                    <Text size="sm">{inputError}</Text>
                  </HoverCard.Dropdown>
                )}
              </HoverCard>
            </Group>
          </Group>
          <Group spacing={0} position="right" noWrap>
            <Button
              leftIcon={<IconMessageDots size="1rem" />}
              className={classes.myCustomButton}
              onClick={feedbackOpen}
              variant="subtle"
              size="xs"
            >
              Feedback
            </Button>
            <Button
              leftIcon={<IconQuestionMark size="1rem" />}
              className={classes.myCustomButton}
              onClick={() => router.push('/about')}
              variant="subtle"
              size="xs"
            >
              About
            </Button>
          </Group>
        </div>
      </div>
      {feedbackOpened && <Feedback opened={feedbackOpened} close={feedbackClose} />}
    </>
  );
}

export default FooterMenu;
