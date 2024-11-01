import Image from 'next/image';
import {
  createStyles,
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  List,
  ThemeIcon,
  useMantineTheme
} from '@mantine/core';
import { IconCloudUpload, IconShare, IconDownload, IconSearch } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  pageWrapper: {
    maxHeight: '100vh', // Limit height of the page to viewport height
    overflowY: 'auto' // Enable scrolling for overflow content
  },
  container: {
    padding: '2rem 1rem', // Adjust padding for smaller feel
    maxWidth: '900px', // Restrict the width of the entire page
    margin: '0 auto',
    textAlign: 'center',
    fontSize: '0.9rem' // Make the font size slightly smaller
  },
  title: {
    fontSize: '2.5rem', // Slightly reduce the size of the title
    fontWeight: 700,
    marginBottom: '1.5rem',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.dark[7]
  },
  subTitle: {
    fontSize: '1.1rem', // Reduce subtitle font size
    marginBottom: '2rem',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[6]
  },
  featureCard: {
    padding: '1rem', // Adjust padding for smaller cards
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm, // Soft shadow
    height: 'auto' // Make card height dynamic based on content
  },
  featureIcon: {
    marginRight: '0.75rem' // Space between icon and title
  },
  featureTitle: {
    fontSize: '1.1rem', // Slightly reduce title font size
    fontWeight: 600
  },
  featureText: {
    marginTop: '1rem', // Adjust title font size
    textAlign: 'left',
    padding: '0rem 1rem'
  },
  list: {
    marginTop: '1.5rem',
    textAlign: 'left'
  },
  listItem: {
    marginBottom: '0.75rem', // Reduce margin between list items
    fontSize: '1rem'
  },
  image: {
    marginTop: '2rem',
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    maxWidth: '100%', // Ensure the image resizes with the page
    height: 'auto'
  }
}));

export default function About() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.pageWrapper}>
      <Container className={classes.container}>
        <Title className={classes.title}>About JSON Viewer</Title>
        <Text className={classes.subTitle}>
          A powerful and intuitive tool for viewing, editing, and sharing JSON files. Whether you
          are a developer or a data enthusiast, JSON Viewer simplifies complex data handling for
          you.
        </Text>

        {/* Feature Section */}
        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          <Card className={classes.featureCard}>
            <Group>
              <ThemeIcon
                size={40}
                radius="lg"
                className={classes.featureIcon}
                color={theme.colors.blue[6]}
              >
                <IconCloudUpload size={24} />
              </ThemeIcon>
              <Text className={classes.featureTitle}>Save JSON Locally or in the Cloud</Text>
            </Group>
            <Text className={classes.featureText}>
              Store JSON files locally or sync with the cloud for easy access across devices,
              keeping your data secure and always available.
            </Text>
          </Card>

          <Card className={classes.featureCard}>
            <Group>
              <ThemeIcon
                size={40}
                radius="lg"
                className={classes.featureIcon}
                color={theme.colors.green[6]}
              >
                <IconShare size={24} />
              </ThemeIcon>
              <Text className={classes.featureTitle}>Share Your JSON Files</Text>
            </Group>
            <Text className={classes.featureText}>
              Collaborate by generating a shareable link to send your JSON files to teammates or
              clients for quick reviews or debugging.
            </Text>
          </Card>

          <Card className={classes.featureCard}>
            <Group>
              <ThemeIcon
                size={40}
                radius="lg"
                className={classes.featureIcon}
                color={theme.colors.orange[6]}
              >
                <IconSearch size={24} />
              </ThemeIcon>
              <Text className={classes.featureTitle}>Search and Filter</Text>
            </Group>
            <Text className={classes.featureText}>
              Use the search functionality to quickly find specific keys or values within large JSON
              documents, saving you time and effort.
            </Text>
          </Card>

          <Card className={classes.featureCard}>
            <Group>
              <ThemeIcon
                size={40}
                radius="lg"
                className={classes.featureIcon}
                color={theme.colors.red[6]}
              >
                <IconDownload size={24} />
              </ThemeIcon>
              <Text className={classes.featureTitle}>Import & Export JSON Files</Text>
            </Group>
            <Text className={classes.featureText}>
              Seamlessly import JSON from your device or a URL, edit it, and export it when you're
              done. No more hassle with manual conversions.
            </Text>
          </Card>
        </SimpleGrid>

        {/* Usage Instructions */}
        <Title order={2} style={{ marginTop: '2rem', fontWeight: 700 }}>
          How to Use JSON Explorer
        </Title>

        <List
          className={classes.list}
          spacing="md"
          icon={
            <ThemeIcon color="blue" size={24}>
              <IconDownload />
            </ThemeIcon>
          }
        >
          <List.Item className={classes.listItem}>
            <b>Step 1:</b> Import your JSON file using the "Import" button or paste a URL.
          </List.Item>
          <List.Item className={classes.listItem}>
            <b>Step 2:</b> Use the tree structure to easily navigate and edit the JSON content.
          </List.Item>
          <List.Item className={classes.listItem}>
            <b>Step 3:</b> Save your edits locally or in the cloud for future access.
          </List.Item>
          <List.Item className={classes.listItem}>
            <b>Step 4:</b> Generate a shareable link or export the updated file to your device.
          </List.Item>
        </List>

        {/* Screenshot Image */}
        <Image
          className={classes.image}
          src="/json-explorer-screenshot.png"
          alt="JSON Explorer Screenshot"
          width={700} // Adjusted width for smaller layout
          height={400}
          priority={true}
        />
      </Container>
    </div>
  );
}
