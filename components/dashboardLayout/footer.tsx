import {
  createStyles,
  Group,
  UnstyledButton,
  Text,
  rem,
  Button,
  HoverCard
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

function FooterMenu({ }) {
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
          <Group position="center">
            <HoverCard width={280} shadow="md">
              <HoverCard.Target>
              <Button
                leftIcon={<IconCircleCheck size="1.25rem" />}
                className={classes.myCustomButton}
                style={{ backgroundColor: inputError === "" ? "#2F9E44" : "#E03131" }}
                variant="subtle"
                size="xs"
              >
                {inputError === "" ? "Valid sdFormat" : "Invalid Format"}
              </Button>
              </HoverCard.Target>
              {inputError && (
                <HoverCard.Dropdown>
                  <Text size="sm">
                    {inputError}
                  </Text>
                </HoverCard.Dropdown>
              )}
            </HoverCard>
          </Group>
        </Group>
      </div>
    </div>
  );
}

export default FooterMenu;
