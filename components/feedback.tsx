import { post } from "@/utils/api";
import {
  Button,
  Loader,
  Modal,
  Rating,
  Space,
  Stack,
  Text,
  Textarea,
  Paper
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const Feedback = ({ opened, open, close }) => {
  const initialValues = { rating: 0, comments: "" };
  const [data, setData] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmit = async () => {
    if (data.rating === 0 && data.comments === "") {
      close();
    } else {
      try {
        setIsLoading(true);
        const response = await post("/api/feedback", data);
        close();
        notifications.show({ message: response.message, color: "green" });
        setData(initialValues);
      } catch (error) {
        notifications.show({ message: error.message, color: "red" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Feedback & Recommend Feature"
      centered
    >
      <Paper radius="md" p="xl" withBorder>

      <Stack align="center">
        <Text size="xl" weight={500}>
          How Did It Go?
        </Text>
        <Rating
          size="xl"
          value={data.rating}
          onChange={(e) => handleChange("rating", e)}
        />
        <Textarea
          placeholder="Your comments..."
          label="Share your thoughts on JSON Viewer! Suggestions welcome."
          value={data.comments}
          onChange={(e) => handleChange("comments", e.currentTarget.value)}
        />
        <Button size="sm" onClick={handleSubmit}>
          {isLoading && (
            <>
              <Loader color="white" size="xs" /> <Space w="xs" />
            </>
          )}
          Submit Feedback
        </Button>
      </Stack>
      </Paper>
    </Modal>
  );
};

export default Feedback;
