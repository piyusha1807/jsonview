import {
  createStyles,
  Group,
  UnstyledButton,
  Text,
  rem,
  Button,
  HoverCard,
  Modal,
} from "@mantine/core";
import {
  IconUser,
  IconCircleCheck,
  IconCloudCheck,
  IconCloud,
  IconDatabase,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@mantine/hooks";
import { AuthenticationForm } from "../authentication";
import { UserInfo } from "../userInfo";

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor: theme.colors.dark[7],
    borderTop: `${rem(1)} solid ${theme.colors.dark[4]}`,
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  myCustomButton: {
    color: theme.colors.dark[0],
    fontWeight: 300,
    fontSize: theme.fontSizes.xs,
    borderRadius: 0,

    ...theme.fn.hover({
      backgroundColor: theme.colors.dark[6],
      color: theme.colors.dark[1],
    }),
  },
}));

function FooterMenu() {
  const { classes } = useStyles();
  const { data: session, status }: any = useSession();

  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData, inputError, outputData, savedData, fileData } = dashboard;

  const [authOpened, { open: authOpen, close: authClose }] =
    useDisclosure(false);

  
  function checkPublicPrivate() {
    if(status !== 'authenticated') {
      return 'Public'
    }
    else if(fileData.globalView.view || fileData.globalView.edit){
      return 'Public'
    }

    return 'Private'
  }

  return (
    <>
      <div className={classes.footer}>
        <div className={classes.inner}>
          <Group spacing={0} position="left" noWrap>
            <Button
              leftIcon={<IconUser size="1.25rem" />}
              className={classes.myCustomButton}
              onClick={authOpen}
              variant="subtle"
              size="xs"
            >
              {session ? session.user.name : "Login"}
            </Button>
            <Button
              leftIcon={inputData === savedData ? <IconCloudCheck size="1.25rem" /> : <IconCloud size="1.25rem" />}
              className={classes.myCustomButton}
              variant="subtle"
              size="xs"
            >
              {inputData === savedData ? 'Saved' : 'Not Saved'}
            </Button>
            <Button
              leftIcon={<IconCloudCheck size="1.25rem" />}
              className={classes.myCustomButton}
              variant="subtle"
              size="xs"
            >
              {checkPublicPrivate()}
            </Button>
            <Group position="center">
              <HoverCard width={280} shadow="md" withArrow>
                <HoverCard.Target>
                  <Button
                    leftIcon={<IconCircleCheck size="1.25rem" />}
                    className={classes.myCustomButton}
                    style={{
                      backgroundColor: inputError === "" ? "" : "#E03131",
                    }}
                    variant="subtle"
                    size="xs"
                  >
                    {inputError === "" ? "Valid Format" : "Invalid Format"}
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
        </div>
      </div>
      <Modal opened={authOpened} onClose={authClose} centered>
        {status === "authenticated" ? <UserInfo /> : <AuthenticationForm />}
      </Modal>
    </>
  );
}

export default FooterMenu;
