import React from 'react';
import styles from './Page.module.less';
import Layout from 'antd/lib/layout';
import Navbar from 'components/Layout/Navbar/Navbar';
import Container from 'components/Layout/Container/Container';
import Helmet from 'react-helmet';
import Footer from 'components/Layout/Footer/Footer';

interface PageProps {
  title: string;
}

const Page = (props: React.PropsWithChildren<PageProps>) => {
  return (
    <div>
      <Layout className={styles.page}>
        <Helmet>
          <title>{props.title}</title>
        </Helmet>
        <Navbar />
        <Container>
          <h1>{props.title}</h1>
          {props.children}
        </Container>
      </Layout>
      <Footer />
    </div>
  );
};

export default Page;
