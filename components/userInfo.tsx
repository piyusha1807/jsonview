import {
  Text,
  Paper,
  PaperProps,
  Button,
  Divider,
  Avatar,
} from "@mantine/core";
import { useSession, signOut } from "next-auth/react";

export function UserInfo(props: PaperProps) {
  const { data: session }: any = useSession();

  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={session.user.image} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {session.user.name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {session.user.email}
      </Text>

      <Button
        variant="filled"
        color="red"
        fullWidth
        mt="md"
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </Paper>
  );
}
