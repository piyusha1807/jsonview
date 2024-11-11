import { Button, ButtonProps } from '@mantine/core';
import GoogleIcon from './GoogleIcon';
import GithubIcon from './GithubIcon';

export function GoogleButton(props: ButtonProps | any) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}

export function GithubButton(props: ButtonProps | any) {
  return <Button {...props} leftIcon={<GithubIcon />} variant="default" color="gray" />;
}
