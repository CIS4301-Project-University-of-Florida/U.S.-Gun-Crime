import React from 'react';
import Page from 'components/Layout/Page/Page';
import { Card } from 'antd';
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
                title={PageEnum.DATA_VISUALIZATIONS.title}
                description={`How has gun crime changed with time? How do different states compare?
                What is the geographic distribution of gun crime in the U.S.?`}
              />
            </Card>
          </Link>
          <Link to={PageEnum.RANKINGS.url}>
            <Card hoverable={true} className={styles.card}>
              <Meta
                title={PageEnum.RANKINGS.title}
                description={`Which states have it worse when it comes to gun crime? What were the 
              deadliest gun crimes in this time period?`}
              />
            </Card>
          </Link>
          <Link to={PageEnum.DEEP_DIVE.url}>
            <Card hoverable={true} className={styles.card}>
              <Meta
                title={PageEnum.DEEP_DIVE.title}
                description={`Only interested in seeing a subset of the data? No problem.
              Filter the data set to get only the info you need.`}
              />
            </Card>
          </Link>
        </article>
        ,
      </Page>
    );
  }
}

export default CatalogPage;
