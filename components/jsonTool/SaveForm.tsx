import { useForm } from '@mantine/form';
import { TextInput, Textarea, Paper, Group, Button, Stack, Modal } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { notifications } from '@mantine/notifications';
import { post } from '@/utils/api';
import { setSavedFileData } from '@/store/actions/dashboardAction';

const SaveForm = ({ opened, saveMessageOpen, close }: any) => {
  const dashboard = useSelector((state: any) => state.dashboard);
  const { inputData, savedFileData } = dashboard;
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { status }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fileName: savedFileData.fileName ?? '',
      comments: savedFileData.comments ?? '',
      type: 'new'
    }
  });

  const handleSubmit = async (type) => {
    const requestData = {
      fileName: form.values.fileName,
      comments: form.values.comments,
      json: inputData,
      type: type,
      id: id
    };

    try {
      setIsLoading(true);
      const { data, message } = await post('/api/saveAndUpdate', requestData);
      close();
      form.reset();
      router.push({
        // pathname: '/',
        query: { id: data.id }
      });

      if (status !== 'authenticated') {
        const storedFiles = JSON.parse(localStorage.getItem('files') || '[]');
        const existingFileIndex = storedFiles.findIndex((file) => file.id === data.id);

        if (existingFileIndex !== -1) {
          storedFiles[existingFileIndex] = data;
        } else {
          storedFiles.unshift({ ...data, local: true });
        }

        localStorage.setItem('files', JSON.stringify(storedFiles));
      }

      dispatch(setSavedFileData(data));
      status === 'authenticated'
        ? notifications.show({ message: message, color: 'green' })
        : saveMessageOpen();
    } catch (error) {
      notifications.show({ message: error.message, color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      size={'md'}
      opened={opened}
      onClose={close}
      title="Save file on the cloud"
      centered={true}
    >
      <Paper radius="md" p="xl" withBorder>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack>
            <TextInput
              label="File name"
              placeholder="File name"
              value={form.values.fileName}
              onChange={(event) => form.setFieldValue('fileName', event.currentTarget.value)}
              radius="md"
              required
            />

            <Textarea
              label="Your comments"
              placeholder="Your comments..."
              value={form.values.comments}
              onChange={(event) => form.setFieldValue('comments', event.currentTarget.value)}
              radius="md"
            />
          </Stack>

          <Group position="right" mt="xl">
            {id && (
              <Button
                type="button"
                variant="light"
                radius="md"
                loading={isLoading}
                onClick={() => handleSubmit('update')}
              >
                Save
              </Button>
            )}
            <Button
              type="button"
              radius="md"
              loading={isLoading}
              onClick={() => handleSubmit('new')}
            >
              {id ? 'Save as new' : 'Save'}
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};

export default SaveForm;
