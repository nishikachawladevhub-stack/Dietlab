import Head from 'next/head';
import Navbar from '../components/Navbar';
import AboutPage from '../components/AboutPage';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Diet Lab</title>
        <meta
          name="description"
          content="Learn about DietLab — personalized nutrition and online consultations built around your lifestyle."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <AboutPage />
    </>
  );
}
