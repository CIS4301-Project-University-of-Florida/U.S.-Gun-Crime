import React from 'react';
import Page from 'components/Layout/Page/Page';
import { Link } from 'react-router-dom';
import { PageEnum } from 'pages/PageEnum';
import styles from './HomePage.module.less';
import { Icon } from 'antd';
import Meta from 'antd/lib/card/Meta';
import MaterialCard from 'components/MaterialCard/MaterialCard';

const HomePage = () => {
  return (
    <Page title={PageEnum.HOME.title}>
      <p>
        Learn how gun crime impacts the U.S. by exploring a number of trends for
        the years 2013–2018.
      </p>
      <article className={styles.cardGrid}>
        <Link to={PageEnum.DATA_VISUALIZATIONS.url}>
          <MaterialCard hoverable={true} className={styles.card}>
            <Meta
              title={
                <span>
                  <Icon type="fund" theme="twoTone" />{' '}
                  {PageEnum.DATA_VISUALIZATIONS.title}
                </span>
              }
              description={`How has gun crime changed with time? How do different states compare?
                What are the typical age ranges of victims or suspects?`}
            />
          </MaterialCard>
        </Link>
        <Link to={PageEnum.RANKINGS.url}>
          <MaterialCard hoverable={true} className={styles.card}>
            <Meta
              title={
                <span>
                  <Icon type="gold" theme="twoTone" /> {PageEnum.RANKINGS.title}
                </span>
              }
              description={`What types of guns account for the most fatalities and injuries? 
                What were the deadliest gun crimes in this time period?`}
            />
          </MaterialCard>
        </Link>
        <Link to={PageEnum.GEOGRAPHIC_DISTRIBUTION.url}>
          <MaterialCard hoverable={true} className={styles.card}>
            <Meta
              title={
                <span>
                  <Icon type="environment" theme="twoTone" />{' '}
                  {PageEnum.GEOGRAPHIC_DISTRIBUTION.title}
                </span>
              }
              description={`How are gun crimes geographically distributed in the U.S.? In which
                areas of the U.S. are gun crimes more concentrated?`}
            />
          </MaterialCard>
        </Link>
        <Link to={PageEnum.DEEP_DIVE.url}>
          <MaterialCard hoverable={true} className={styles.card}>
            <Meta
              title={
                <span>
                  <Icon type="database" theme="twoTone" />{' '}
                  {PageEnum.DEEP_DIVE.title}
                </span>
              }
              description={`Looking to conduct a more specific search? No problem!
              Use this tool to filter the data set and get the info you need.`}
            />
          </MaterialCard>
        </Link>
      </article>
    </Page>
  );
};

export default HomePage;
