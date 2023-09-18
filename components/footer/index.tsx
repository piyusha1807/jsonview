import {
  createStyles,
  Group,
  Text,
  rem,
  Button,
  HoverCard,
} from "@mantine/core";
import {
  IconUser,
  IconCircleCheck,
  IconCloudCheck,
  IconCloud,
  IconCloudLockOpen,
  IconCloudLock,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import { AuthenticationForm } from "../authentication";

const UserInfo = dynamic(() => import("../userInfo"), {
  ssr: false,
});
const Feedback = dynamic(() => import("../feedback"), {
  ssr: false,
});

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    height: "25px",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  myCustomButton: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontWeight: 300,
    fontSize: theme.fontSizes.xs,
    borderRadius: 0,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
    }),
  },
}));

function FooterMenu() {
  const { classes } = useStyles();
  const { data: session, status }: any = useSession();

  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData, inputError, outputData, savedFileData } = dashboard;

  const [userInfoOpened, { open: userInfoOpen, close: userInfoClose }] =
    useDisclosure(false);
  const [authFormOpened, { open: authFormOpen, close: authFormClose }] =
    useDisclosure(false);
  const [feedbackOpened, { open: feedbackOpen, close: feedbackClose }] =
    useDisclosure(false);

  function isFilePublic() {
    if (status !== "authenticated") {
      return true;
    } else if (savedFileData?.globalView || savedFileData.globalEdit) {
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
              leftIcon={<IconUser size="1rem" />}
              className={classes.myCustomButton}
              onClick={status === "authenticated" ? userInfoOpen : authFormOpen}
              variant="subtle"
              size="xs"
            >
              {session ? session.user.name : "Login"}
            </Button>
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
              {inputData === savedFileData?.json ? "Saved" : "Not Saved"}
            </Button>
            <Button
              leftIcon={
                isFilePublic() ? (
                  <IconCloudLockOpen size="1rem" />
                ) : (
                  <IconCloudLock size="1rem" />
                )
              }
              className={classes.myCustomButton}
              variant="subtle"
              size="xs"
            >
              {isFilePublic() ? "Public" : "Private"}
            </Button>
            <Group position="center">
              <HoverCard width={280} shadow="md" withArrow>
                <HoverCard.Target>
                  <Button
                    leftIcon={<IconCircleCheck size="1rem" />}
                    className={classes.myCustomButton}
                    style={{
                      backgroundColor: inputError === "" ? "" : "#E03131",
                      color: inputError === "" ? "" : "#E9ECEF",
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
          <Group spacing={0} position="right" noWrap>
            <Button
              className={classes.myCustomButton}
              onClick={feedbackOpen}
              variant="subtle"
              size="xs"
            >
              Feedback & Recommend Feature
            </Button>
          </Group>
        </div>
      </div>
      {userInfoOpened && (
        <UserInfo
          opened={userInfoOpened}
          open={userInfoOpen}
          close={userInfoClose}
        />
      )}
      {authFormOpened && (
        <AuthenticationForm
          opened={authFormOpened}
          open={authFormOpen}
          close={authFormClose}
        />
      )}
      {feedbackOpened && (
        <Feedback
          opened={feedbackOpened}
          open={feedbackOpen}
          close={feedbackClose}
        />
      )}
    </>
  );
}

export default FooterMenu;
