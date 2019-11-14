import React from 'react';
import Page from 'components/Layout/Page/Page';
import { Card, Icon } from 'antd';
import Meta from 'antd/lib/card/Meta';
import styles from './CatalogPage.module.less';
import { PageEnum } from 'pages/PageEnum';
import { Link } from 'react-router-dom';

class CatalogPage extends React.Component {
  public render() {
    return (
      <Page title={PageEnum.DATA_CATALOG.title}>
        <p>
          Learn how gun crime impacts the U.S. by exploring a number of trends
          for the years 2013–2018.
        </p>
        <article className={styles.cardGrid}>
          <Link to={PageEnum.DATA_VISUALIZATIONS.url}>
            <Card hoverable={true} className={styles.card}>
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
            </Card>
          </Link>
          <Link to={PageEnum.RANKINGS.url}>
            <Card hoverable={true} className={styles.card}>
              <Meta
                title={
                  <span>
                    <Icon type="gold" theme="twoTone" />{' '}
                    {PageEnum.RANKINGS.title}
                  </span>
                }
                description={`What types of guns account for the most fatalities and injuries? 
                What were the deadliest gun crimes in this time period?`}
              />
            </Card>
          </Link>
          <Link to={PageEnum.GEOGRAPHIC_DISTRIBUTION.url}>
            <Card hoverable={true} className={styles.card}>
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
            </Card>
          </Link>
          <Link to={PageEnum.DEEP_DIVE.url}>
            <Card hoverable={true} className={styles.card}>
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
            </Card>
          </Link>
        </article>
      </Page>
    );
  }
}

export default CatalogPage;
