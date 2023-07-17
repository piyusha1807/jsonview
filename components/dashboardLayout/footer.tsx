import {
  createStyles,
  Group,
  UnstyledButton,
  Text,
  rem,
  Button,
} from "@mantine/core";
import {
  IconUser,
  IconCircleCheck,
  IconCloudCheck,
  IconDatabase,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

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

function FooterMenu({ error }) {
  const { classes } = useStyles();
  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData, inputError, outputData } = dashboard;

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group spacing={0} position="left" noWrap>
          <Button
            leftIcon={<IconUser size="1.25rem" />}
            className={classes.myCustomButton}
            variant="subtle"
            size="xs"
          >
            Login
          </Button>
          <Button
            leftIcon={<IconCloudCheck size="1.25rem" />}
            className={classes.myCustomButton}
            variant="subtle"
            size="xs"
          >
            Saved
          </Button>
          <Button
            leftIcon={<IconCircleCheck size="1.25rem" />}
            className={classes.myCustomButton}
            style={{ backgroundColor: inputError === "" ? "#F03E3E" : "" }}
            variant="subtle"
            size="xs"
          >
            {inputError === "" ? "Valid Format" : "Invalid Format"}
          </Button>
        </Group>
      </div>
    </div>
  );
}

export default FooterMenu;
