import React from 'react';
import {
  Button,
  Card,
  Container,
  Flex,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  IconAlignBoxLeftStretch,
  IconArrowRight,
  IconBug,
  IconDeviceFloppy,
  IconShare
} from '@tabler/icons-react';
import style from '@/styles/LandingPage.module.scss';

const cards = [
  {
    id: 0,
    title: 'Format',
    description: 'Beautify your JSON for readability.',
    color: '#DF3F81',
    icon: <IconShare size={36} />
  },
  {
    id: 1,
    title: 'Minify',
    description: 'Compress JSON to save space.',
    color: '#54A754',
    icon: <IconShare size={36} />
  },
  {
    id: 2,
    title: 'Tree View',
    description: 'Navigate complex nested structures with ease.',
    color: '#DF3F81',
    icon: <IconShare size={36} />
  },
  {
    id: 3,
    title: 'Debug',
    description: 'Identify and resolve JSON issues quickly.',
    color: '#F99902',
    icon: <IconShare size={36} />
  },
  {
    id: 4,
    title: 'Import/Export',
    description: 'Seamlessly transfer your JSON files in and out.',
    color: '#02A996',
    icon: <IconShare size={36} />
  },
  {
    id: 5,
    title: 'Share',
    description: 'Collaborate by sending JSON files to others with just a click.',
    color: '#9201EF',
    icon: <IconShare size={36} />
  },
  {
    id: 6,
    title: 'Cloud',
    description: 'Securely save your JSON data in the cloud for easy access.',
    color: '#1A69FF',
    icon: <IconShare size={36} />
  }
];

const LandingPage = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  return (
    <div className={style.pageWrapper}>
      <nav className={style.nav}>
        <Title order={4} className={style.logoText}>
          JSON Viewer
        </Title>
        <div className={style.links}>
          <Link href="/json-tool">Json Tool</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>

      <section className={style.heroSection}>
        <Container>
          <Title className={style.heroTitle}>
            Explore JSON with <span style={{ color: theme.colors.blue[7] }}>Ease</span>
          </Title>
          <Text className={style.heroSubtitle}>
            An intuitive tool designed for developers to visualize, manage, and share JSON data.
          </Text>
          <div className={style.heroButtons}>
            <Button
              className={style.buttonPrimary}
              color="blue"
              size="md"
              variant="filled"
              onClick={() => router.push('/json-tool')}
              leftIcon={<IconArrowRight />}
            >
              Go to Editor
            </Button>
          </div>
        </Container>
        <Container className={style.heroImage}>
          <Image src="/hero.png" width={500} height={400} alt="Picture of the author" />
        </Container>
      </section>

      <section className={style.importanceSection}>
        <Container>
          <Title className={style.importanceTitle}>Why Use JSON Viewer?</Title>
          <Text className={style.importanceSubtitle}>
            Eliminate the hassle of working with complex JSON files.
          </Text>
          <div className={style.importancePoints}>
            <Flex gap="sm">
              <IconBug /> <Text fw={700}>Debug Fast</Text>
            </Flex>
            <Flex gap="sm">
              <IconAlignBoxLeftStretch /> <Text fw={700}>Clear Structure</Text>
            </Flex>
            <Flex gap="sm">
              <IconShare /> <Text fw={700}>Share Easily</Text>
            </Flex>
            <Flex gap="sm">
              <IconDeviceFloppy /> <Text fw={700}>Save and Access Later</Text>
            </Flex>
          </div>
        </Container>
        <Container className={style.importanceImage}>
          <Image src="/tool.png" width={700} height={350} alt="Picture of the author" />
        </Container>
      </section>

      <section className={style.featureSection}>
        <Container className={style.featureContainer}>
          <Title className={style.featureTitle}>Welcome to most enjoyable JSON experience</Title>

          <div className={style.featureCards}>
            {cards.map((card) => (
              <Card key={card.id} className={style.featureCard} radius="md">
                <ThemeIcon size={60} className={style.featureIcon} color={card.color} radius="lg">
                  {card.icon}
                </ThemeIcon>
                <Text fw={700} size="xl" className={style.featureHeading}>
                  {card.title}
                </Text>
                <Text className={style.featureDescription}>{card.description}</Text>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className={style.ctaSection}>
        <Title className={style.ctaTitle}>Get Started with JSON Viewer</Title>
        <Text className={style.ctaSubtitle}>
          Start managing your JSON files today with JSON Viewer. No setup needed, free to use.
          Experience a streamlined workflow.
        </Text>
        <div className={style.ctaButtons}>
          <Button
            className={style.buttonPrimary}
            color="blue"
            size="md"
            variant="filled"
            onClick={() => router.push('/json-tool')}
          >
            Try It Free
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={style.footer}>
        <Text>&copy; 2024 JSON Viewer. All rights reserved.</Text>
        <Text>
          <Link href="/about" style={{ color: theme.colors.blue[6] }}>
            About
          </Link>{' '}
          |{' '}
          <Link href="/terms" style={{ color: theme.colors.blue[6] }}>
            Terms
          </Link>{' '}
          |{' '}
          <Link href="/contact" style={{ color: theme.colors.blue[6] }}>
            Contact Us
          </Link>
        </Text>
      </footer>
    </div>
  );
};

export default LandingPage;
