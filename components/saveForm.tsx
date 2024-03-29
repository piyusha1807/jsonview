import { useForm } from "@mantine/form";
import {
  TextInput,
  Textarea,
  Paper,
  Group,
  Button,
  Stack,
  Loader,
  Modal,
  Space,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { post } from "@/utils/api";
import { notifications } from "@mantine/notifications";
import { setSavedFileData } from "@/store/actions/dashboardAction";

const SaveForm = ({ opened, open, saveMessageOpen, close }: any) => {
  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData } = dashboard;
  const router = useRouter();
  const dispatch = useDispatch();
  const { status }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fileName: "",
      comments: "",
      type: "new",
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      fileName: form.values.fileName,
      comments: form.values.comments,
      json: inputData,
    };

    try {
      setIsLoading(true);
      const { data, message } = await post("/api/saveAndUpdate", requestData);
      close();
      router.push({
        pathname: "/",
        query: { id: data.id },
      });
      dispatch(setSavedFileData(data));
      status === "authenticated" 
        ? notifications.show({ message: message, color: "green" }) 
        : saveMessageOpen();
      form.reset();
    } catch (error) {
      notifications.show({ message: error.message, color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      size={"md"}
      opened={opened}
      onClose={close}
      title="Save file on the cloud"
      centered={true}
    >
      <Paper radius="md" p="xl" withBorder>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="File name"
              placeholder="File name"
              value={form.values.fileName}
              onChange={(event) =>
                form.setFieldValue("fileName", event.currentTarget.value)
              }
              radius="md"
              required
            />

            <Textarea
              label="Your comments"
              placeholder="Your comments..."
              disabled={status !== "authenticated"}
              value={form.values.comments}
              onChange={(event) =>
                form.setFieldValue("comments", event.currentTarget.value)
              }
              radius="md"
            />

            {/* <Switch
              label="Make file public"
              description="Toggle this switch to make the file accessible to everyone."
              checked={form.values.isPublic}
              onClick={(event) =>
                form.setFieldValue("isPublic", event.currentTarget.checked)
              }
            /> */}
          </Stack>

          <Group position="right" mt="xl">
            <Button type="submit" radius="md">
              {isLoading && (
                <>
                  <Loader color="white" size="xs" /> <Space w="xs" />
                </>
              )}
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};

export default SaveForm;
