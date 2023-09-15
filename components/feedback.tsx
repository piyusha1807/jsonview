import { post } from "@/utils/api";
import {
    Button,
    Modal,
    Rating,
    Stack,
    Text,
    Textarea,
  } from "@mantine/core";
import { notifications } from "@mantine/notifications";
  import { useState } from "react";
  
  export function Feedback({ opened, open, close }) {
    const initialValues = { rating: 0, comments: ""};
    const [data, setData] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (key, value) => {
      setData((prevData) => ({...prevData, [key]: value}))
    }
  
    const handleSubmit = async () => {
      if(data.rating === 0 && data.comments === ""){
        close();
      }
      else {
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
    }
    
    return (
      <Modal opened={opened} onClose={close} title="Feedback & Recommend Feature" centered>
        <Stack align="center" >
          <Text size="md" weight={500}>
            How Did It Go?
          </Text>
          <Rating size="xl" value={data.rating} onChange={(e) => handleChange("rating", e)} />
          <Textarea
            placeholder="Your comment"
            label="Please share your thoughts on using JSON Viewer, any suggestions, or feedback you have"
            value={data.comments}
            onChange={(e) => handleChange("comments", e.currentTarget.value)}
          />
          <Button size="sm" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Modal>
    );
  }
  