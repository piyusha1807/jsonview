import Head from 'next/head';
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Card,
  Group,
  ThemeIcon,
  useMantineTheme
} from '@mantine/core';
import {
  IconCloudUpload,
  IconShare,
  IconDownload,
  IconSearch,
  IconEdit,
  IconSettings
} from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  pageWrapper: {
    maxHeight: '100vh', // Ensure the page is scrollable
    overflowY: 'auto'
  },
  heroSection: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: '2rem 2rem',
    textAlign: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[7]
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 800,
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9]
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    margin: '1rem 0',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[7],
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heroButtons: {
    marginTop: '2.5rem'
  },
  buttonPrimary: {
    marginRight: '1rem',
    backgroundColor: theme.colors.blue[6],
    color: theme.white,
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    '&:hover': {
      backgroundColor: theme.colors.blue[7]
    }
  },
  buttonSecondary: {
    color: theme.colors.blue[6],
    borderColor: theme.colors.blue[6],
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    }
  },
  featureSection: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    padding: '4rem 2rem',
    textAlign: 'center'
  },
  featureTitle: {
    fontSize: '2.2rem',
    fontWeight: 700,
    marginBottom: '2rem',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9]
  },
  featureCard: {
    padding: '2rem',
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.shadows.lg
    }
  },
  featureIcon: {
    marginRight: '0rem',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[0] // Neutral color for icons
  },
  featureHeading: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9]
  },
  featureDescription: {
    fontSize: '1rem',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[7],
    marginTop: '1rem',
    textAlign: 'left',
    padding: '0rem 1rem'
  },
  image: {
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    marginTop: '2rem',
    marginBottom: '3rem'
  },
  ctaSection: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    padding: '4rem 2rem',
    textAlign: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[2] : theme.colors.dark[7]
  },
  footer: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
    padding: '2rem',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[6],
    textAlign: 'center',
    fontSize: '0.9rem'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[7],
    margin: '3rem 0rem 1rem 4rem'
  }
}));

export default function LandingPageComponent() {
  const router = useRouter();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.pageWrapper}>
      <Title className={classes.logoText}>JSON Viewer</Title>
      {/* Hero Section */}
      <section className={classes.heroSection}>
        <Container>
          <Title className={classes.heroTitle}>
            Manage, Edit, and Share JSON Files Effortlessly
          </Title>
          <Text className={classes.heroSubtitle}>
            JSON Explorer is an intuitive tool to visualize, edit, and share your JSON data. Perfect
            for developers working with APIs and complex data structures.
          </Text>
          <div className={classes.heroButtons}>
            <Button
              className={classes.buttonPrimary}
              size="lg"
              variant="filled"
              onClick={() => router.push('/json-tool')}
            >
              Get Started
            </Button>
            <Button className={classes.buttonSecondary} size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className={classes.featureSection}>
        <Container>
          <Title className={classes.featureTitle}>Why Use JSON Explorer?</Title>
          <SimpleGrid cols={3} spacing="lg" breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            <Card className={classes.featureCard}>
              <Group>
                <ThemeIcon size={40} className={classes.featureIcon} radius="lg">
                  <IconCloudUpload size={24} />
                </ThemeIcon>
                <Text className={classes.featureHeading}>Cloud & Local Storage</Text>
              </Group>
              <Text className={classes.featureDescription}>
                Save your JSON files locally or sync them to the cloud for access across all your
                devices.
              </Text>
            </Card>

            <Card className={classes.featureCard}>
              <Group>
                <ThemeIcon size={40} className={classes.featureIcon} radius="lg">
                  <IconShare size={24} />
                </ThemeIcon>
                <Text className={classes.featureHeading}>Seamless Sharing</Text>
              </Group>
              <Text className={classes.featureDescription}>
                Generate a shareable link for your JSON files in seconds. Collaborate easily with
                teammates or clients.
              </Text>
            </Card>

            <Card className={classes.featureCard}>
              <Group>
                <ThemeIcon size={40} className={classes.featureIcon} radius="lg">
                  <IconDownload size={24} />
                </ThemeIcon>
                <Text className={classes.featureHeading}>Import & Export JSON</Text>
              </Group>
              <Text className={classes.featureDescription}>
                Effortlessly import and export JSON files, ensuring that your workflow is smooth and
                fast.
              </Text>
            </Card>

            <Card className={classes.featureCard}>
              <Group>
                <ThemeIcon size={40} className={classes.featureIcon} radius="lg">
                  <IconSearch size={24} />
                </ThemeIcon>
                <Text className={classes.featureHeading}>Advanced Search & Filtering</Text>
              </Group>
              <Text className={classes.featureDescription}>
                Easily search and filter through large JSON files, finding the data you need quickly
                and efficiently.
              </Text>
            </Card>

            <Card className={classes.featureCard}>
              <Group>
                <ThemeIcon size={40} className={classes.featureIcon} radius="lg">
                  <IconEdit size={24} />
                </ThemeIcon>
                <Text className={classes.featureHeading}>Real-Time Editing</Text>
              </Group>
              <Text className={classes.featureDescription}>
                Edit your JSON files in real-time with a user-friendly interface that saves every
                change as you make it.
              </Text>
            </Card>

            <Card className={classes.featureCard}>
              <Group>
                <ThemeIcon size={40} className={classes.featureIcon} radius="lg">
                  <IconSettings size={24} />
                </ThemeIcon>
                <Text className={classes.featureHeading}>Customizable Layout</Text>
              </Group>
              <Text className={classes.featureDescription}>
                Adjust the layout and interface of JSON Explorer to suit your workflow and improve
                productivity.
              </Text>
            </Card>
          </SimpleGrid>

          {/* Image Section */}
          <Image
            className={classes.image}
            src="/json-explorer-screenshot.png"
            alt="JSON Explorer in action"
            width={1000}
            height={500}
          />
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className={classes.ctaSection}>
        <Container>
          <Title>Get Started with JSON Explorer</Title>
          <Text>
            Start managing your JSON files today with JSON Explorer. No setup needed, free to use.
            Experience a streamlined workflow.
          </Text>
          <div className={classes.heroButtons}>
            <Button
              className={classes.buttonPrimary}
              size="lg"
              variant="filled"
              onClick={() => router.push('/json-tool')}
            >
              Try It Free
            </Button>
          </div>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className={classes.footer}>
        <Container>
          <Text>&copy; 2024 JSON Explorer. All rights reserved.</Text>
          <Text>
            <a href="/about" style={{ color: theme.colors.blue[6] }}>
              About
            </a>{' '}
            |{' '}
            <a href="/terms" style={{ color: theme.colors.blue[6] }}>
              Terms
            </a>{' '}
            |{' '}
            <a href="/contact" style={{ color: theme.colors.blue[6] }}>
              Contact Us
            </a>
          </Text>
        </Container>
      </footer>
    </div>
  );
}
