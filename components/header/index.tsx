import { createStyles, Header, rem, Text, Box } from "@mantine/core";
import { useSelector } from "react-redux";
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
  const { savedFileData } = useSelector((state: any) => state.dashboard);

  return (
    <div>
      <Header className={classes.customHeader} height={50} px="md">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Box>
            <LeftHeader />
          </Box>
          <Box>
            <Text>{savedFileData?.fileName}</Text>
          </Box>
          <Box>
            <RightHeader />
          </Box>
        </Box>
      </Header>
    </div>
  );
};

export default HeaderMenu;
