import HeaderMenu from "./header";
import FooterMenu from "./footer";
import Jsontool from "./jsontool";
import { Box } from "@mantine/core";
import { useState } from "react";

const DashboardLayout = ({ children }: any) => {
  const [inputVal, setInputVal] = useState("");
  const [outputVal, setOutputVal] = useState("");
  const [error, setError] = useState("");

  const handleError = (err: any) => {
    setError(err);
  };

  const handleInputVal = (val: any) => {
    setInputVal(val);
  };

  const handleOutputVal = (val: any) => {
    setOutputVal(val);
  };

  return (
    <Box>
      <HeaderMenu onInputVal={handleInputVal} />
      <Jsontool
        inputVal={inputVal}
        outputVal={outputVal}
        onInputVal={handleInputVal}
        onOutputVal={handleOutputVal}
        onError={handleError}
      />
      <FooterMenu error={error} />
    </Box>
  );
};

export default DashboardLayout;
