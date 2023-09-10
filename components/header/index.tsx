import { createStyles, Header, Group, rem } from "@mantine/core";
import LeftHeader from "./leftHeader";
import RightHeader from "./rightHeader";

const useStyles = createStyles((theme) => ({
  customHeader: {
    backgroundColor: theme.colors.dark[7],
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
  },
}));

const HeaderMenu = ({}) => {
  const { classes } = useStyles();

  return (
    <>
      <Header className={classes.customHeader} height={50} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <LeftHeader />
          <RightHeader />
        </Group>
      </Header>
    </>
  );
};

export default HeaderMenu;
