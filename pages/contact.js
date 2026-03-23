import Head from 'next/head';
import Navbar from '../components/Navbar';
import ContactPage from '../components/ContactPage';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Diet Lab</title>
        <meta
          name="description"
          content="Get in touch with DietLab — consultation requests, questions, and booking."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <ContactPage />
    </>
  );
}
