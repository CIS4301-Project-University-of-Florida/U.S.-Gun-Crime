import React from 'react';
import styles from './Page.module.scss';
import Layout from 'antd/lib/layout';
import Navbar from 'components/Layout/Navbar/Navbar';
import ContentContainer from 'components/Layout/Container/Container';
import Helmet from 'react-helmet';

interface PageProps {
  title: String;
}

const Page = (props: React.PropsWithChildren<PageProps>) => {
  return (
    <Layout className={styles.page}>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <Navbar />
      <ContentContainer>
        <h1>{props.title}</h1>
        {props.children}
      </ContentContainer>
    </Layout>
  );
};

export default Page;
