import { Button, ButtonProps, Group } from "@mantine/core";
// import { GithubIcon } from "@mantine/ds";
import GoogleIcon from "./GoogleIcon";
import GithubIcon from "./GithubIcon";

export function GoogleButton(props: ButtonProps | any) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}

export function GithubButton(props: ButtonProps | any) {
  return (
    <Button
      {...props}
      leftIcon={<GithubIcon />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === "dark" ? 8 : 7],
        color: "#fff",
        "&:hover": {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
        },
      })}
    />
  );
}
