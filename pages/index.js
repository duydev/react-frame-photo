import Head from 'next/head';

import { SinglePage } from '../components/SinglePage/SinglePage';
import Layout from '../components/Layout/Layout';

const Index = () => (
  <div>
    <Head>
      <title>Frame Photo - hi@duydev.me</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Layout>
      <SinglePage />
    </Layout>
  </div>
);

export default Index;
