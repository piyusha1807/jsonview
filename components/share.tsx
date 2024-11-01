import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { setSavedFileData } from "@/store/actions/dashboardAction";
import { post } from "@/utils/api";
import {
  Alert,
  Button,
  Flex,
  Loader,
  Modal,
  Space,
  Stack,
  Text,
  Menu,
  UnstyledButton,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconWorld,
  IconAlertCircle,
  IconChevronDown,
} from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const shareOptions = [
  { label: "Restricted", value: "private" },
  { label: "Anyone with the link", value: "public" },
];
const shareTypeOptions = [
  { label: "View", value: "view" },
  { label: "Edit", value: "edit" },
];

const Share = ({ opened, open, close }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status }: any = useSession();
  const { inputData, savedFileData } = useSelector(
    (state: any) => state.dashboard
  );
  const [isCopied, copy] = useCopyToClipboard();
  const [isLoading, setIsLoading] = useState(false);
  const [shareSelected, setShareSelected] = useState(shareOptions[0]);
  const [shareTypeSelected, setShareTypeSelected] = useState(
    shareTypeOptions[0]
  );

  const setDefaultShareValues = () => {
    if (savedFileData.globalAccess?.view || savedFileData.globalAccess?.edit) {
      setShareSelected(shareOptions[1]);
      setShareTypeSelected(
        savedFileData.globalAccess?.view
          ? shareTypeOptions[0]
          : shareTypeOptions[1]
      );
    } else {
      setShareSelected(shareOptions[0]);
    }
  };

  const handleShare = async () => {
    try {
      const requestData = {
        json: inputData,
        share: shareSelected.value,
        shareType: shareTypeSelected.value,
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
    <Modal
      title="Share File"
      size="md"
      opened={opened}
      onClose={close}
      centered
    >
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
        <Flex justify="space-between" align="center" columnGap="0.5rem">
          <Flex align="center" columnGap="0.5rem">
            <IconWorld size="1.50rem" />
            <div>
              <CustomMenu
                selected={shareSelected}
                onSelect={setShareSelected}
                options={shareOptions}
              />
              <Text c="dimmed" size="sm">
                {shareSelected.value === "private" &&
                  "Owner can only view or edit file"}
                {shareSelected.value === "public" &&
                  `Everyone with this link can ${shareTypeSelected.value}`}
              </Text>
            </div>
          </Flex>
          {shareSelected.value === "public" && (
            <CustomMenu
              selected={shareTypeSelected}
              onSelect={setShareTypeSelected}
              options={shareTypeOptions}
              position="bottom-end"
              width={80}
            />
          )}
        </Flex>
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

const CustomMenu = ({
  selected,
  onSelect,
  options,
  position = "bottom-start",
  width = 200,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <Menu
      radius="sm"
      position={position}
      width={width}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton data-expanded={opened || undefined}>
          <span>{selected.label}</span>
          <IconChevronDown size="1rem" stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {options.map((item: any) => (
          <Menu.Item onClick={() => onSelect(item)} key={item.value}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default Share;
