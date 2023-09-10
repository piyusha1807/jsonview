import HeaderMenu from "../header";
import FooterMenu from "../footer";
import Jsontool from "../jsontool";
import { Box } from "@mantine/core";

const DashboardLayout = ({ children }: any) => {
  return (
    <Box>
      <HeaderMenu />
      <Jsontool />
      <FooterMenu />
    </Box>
  );
};

export default DashboardLayout;
