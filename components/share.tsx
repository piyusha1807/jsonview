import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { setSavedFileData } from "@/store/actions/dashboardAction";
import { post } from "@/utils/api";
import {
  Alert,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Loader,
  Modal,
  Paper,
  SegmentedControl,
  Select,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconWorld,
  IconUsersGroup,
  IconEdit,
  IconEye,
  IconAlertCircle,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Share = ({ opened, open, close }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status }: any = useSession();
  const { inputData, savedFileData } = useSelector(
    (state: any) => state.dashboard
  );
  const [isCopied, copy] = useCopyToClipboard();
  const [shareValue, setShareValue] = useState("private");
  const [permissionValue, setPermissionValue] = useState("edit");
  const [isLoading, setIsLoading] = useState(false);

  const setDefaultShareValues = () => {
    if (savedFileData?.globalView || savedFileData?.globalEdit) {
      setShareValue("public");
      setPermissionValue(savedFileData?.globalView ? "view" : "edit");
    } else {
      setShareValue("private");
    }
  };

  const handleShare = async () => {
    try {
      const requestData = {
        json: inputData,
        share: shareValue,
        shareType: permissionValue,
        id: id,
      };

      setIsLoading(true);
      const { data, message } = await post("/api/share", requestData);

      if (!id) {
        router.push({
          pathname: "/",
          query: { id: data.id },
        });
      }

      dispatch(setSavedFileData(data));
      copy(`${window.location.origin}/?id=${data.id}`);
      notifications.show({ message: message, color: "green" });
    } catch (error) {
      notifications.show({ message: error.message, color: "red" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (opened) {
      setDefaultShareValues();
    }
  }, [opened]);

  return (
    <Modal size="md" opened={opened} onClose={close} centered>
      <Stack>
        {inputData !== savedFileData?.json && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Unsaved Changes"
            // color="yellow"
            radius="xs"
            withCloseButton
          >
            Clicking Save Changes will save your file and apply sharing settings
          </Alert>
        )}
        <Flex justify="space-between" align="center">
          <Text size="lg" weight={600}>
            Share File
          </Text>
          <SegmentedControl
            size="sm"
            value={shareValue}
            onChange={setShareValue}
            data={[
              { label: "Private", value: "private" },
              { label: "Public", value: "public" },
            ]}
          />
        </Flex>
        {shareValue === "public" && (
          <Paper p="xs" withBorder>
            <Stack>
              <Flex justify="flex-start" align="center" columnGap="0.5rem">
                <IconWorld size="1.25rem" />
                <Text size="md" weight={500}>
                  {permissionValue === "view" &&
                    "Everyone with this link can view"}
                  {permissionValue === "edit" &&
                    "Everyone with this link can edit"}
                </Text>
              </Flex>

              <Flex justify="space-between" align="center">
                <Text>Permission</Text>
                <SegmentedControl
                  size="xs"
                  value={permissionValue}
                  onChange={setPermissionValue}
                  data={[
                    {
                      label: (
                        <Center>
                          <IconEye size="1rem" />
                          <Box ml={8}>View</Box>
                        </Center>
                      ),
                      value: "view",
                    },
                    {
                      label: (
                        <Center>
                          <IconEdit size="1rem" />
                          <Box ml={8}>Edit</Box>
                        </Center>
                      ),
                      value: "edit",
                    },
                  ]}
                />
              </Flex>
              {/* "Edit (Make any changes)",
                "View (Cannot make changes)" },
              */}
            </Stack>
          </Paper>
        )}
        <Flex justify="flex-end" align="center" columnGap={10}>
          <Button size="sm" onClick={handleShare}>
            {isLoading && (
              <>
                <Loader color="white" size="xs" /> <Space w="xs" />
              </>
            )}
            Save Changes
          </Button>
          {/* <Button size="sm" onClick={() => copy("")}>
            {isCopied ? "Copied!" : "Copy link"}
          </Button> */}
        </Flex>
      </Stack>
    </Modal>
  );
};

export default Share;
