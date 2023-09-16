import { createStyles, Header, Group, rem } from "@mantine/core";
import LeftHeader from "./leftHeader";
import RightHeader from "./rightHeader";

const useStyles = createStyles((theme) => ({
  customHeader: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const HeaderMenu = ({}) => {
  const { classes } = useStyles();

  return (
    <div>
      <Header className={classes.customHeader} height={50} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <LeftHeader />
          <RightHeader />
        </Group>
      </Header>
    </div>
  );
};

export default HeaderMenu;
