import Head from 'next/head';
import DietLabPage from '../components/DietLabPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Diet Lab - Personalized Nutrition & Online Consultations</title>
        <meta name="description" content="Personalized nutrition consultations and diet plans online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DietLabPage />
    </>
  );
}


