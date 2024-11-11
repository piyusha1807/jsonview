import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Title, Text, Button, useMantineTheme, Flex } from '@mantine/core';
import {
  IconArrowRight,
  IconBrandLinkedin,
  IconBug,
  IconDeviceFloppy,
  IconShare,
  IconTools
} from '@tabler/icons-react';
import style from '@/styles/AboutPage.module.scss';

const AboutPage = () => {
  const router = useRouter();
  const theme = useMantineTheme();

  const navigateHome = () => router.push('/');

  return (
    <div className={style.pageWrapper}>
      <nav className={style.nav}>
        <Title order={4} className={style.logoText} onClick={navigateHome}>
          JSON Viewer
        </Title>
        <div className={style.links}>
          <Link href="/json-tool">Json Tool</Link>
          <Link href="/">Home</Link>
        </div>
      </nav>

      <main className={style.mainContent}>
        <section className={style.description}>
          <Text className={style.descriptionText}>
            🚀 Discover the simplicity of JSON handling with our powerful JSON Viewer! Whether
            you're managing application configurations, analyzing data, or building dynamic web
            apps, our tool ensures a seamless experience.
          </Text>
          <div className={style.features}>
            <Title order={5}>Key Features</Title>
            <ul>
              <li>
                <IconTools size={18} /> Fully Interactive Editor
              </li>
              <li>
                <IconDeviceFloppy size={18} /> Local and Cloud Save Options
              </li>
              <li>
                <IconShare size={18} /> Easy Sharing Capabilities
              </li>
              <li>
                <IconBug size={18} /> Debugging Features for Efficient Testing
              </li>
            </ul>
          </div>
        </section>

        <section className={style.profileSection}>
          <Image height={200} width={200} alt="Creator's profile" src="/profile.jpg" />
          <Flex direction="column" justify="space-between" gap={20} sx={{ height: '100%' }}>
            <Text>
              👋 Hello! I'm Piyush Agrawal, a full-stack developer driven by a passion for community
              and innovation. I created JSON Viewer to empower developers like you, enhancing coding
              efficiency and collaboration across projects. Let's connect and grow together!
            </Text>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/piyushagrawal1807/"
              style={{ color: theme.colors.blue[8] }}
            >
              <IconBrandLinkedin size={40} />
            </Link>
          </Flex>
        </section>
      </main>

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

export default AboutPage;
