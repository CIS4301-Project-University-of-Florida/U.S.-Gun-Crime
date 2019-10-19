import React from 'react';
import Page from 'components/Layout/Page/Page';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import styles from './CatalogPage.module.less';

class CatalogPage extends React.Component {
  public render() {
    return (
      <Page title="Data Catalog">
        <p>
          Learn how gun crime impacts the U.S. by exploring a number of trends
          for the years 2013–2018.
        </p>
        <article className={styles.cardGrid}>
          <Card hoverable={true}>
            <Meta
              title="Data Visualizations"
              description={`How has gun crime changed with time? How do different states compare?
                What is the geographic distribution of gun crime in the U.S.?`}
            />
          </Card>
          <Card hoverable={true}>
            <Meta
              title="Rankings"
              description={`Which states have it worse when it comes to gun crime? What were the 
              deadliest gun crimes in this time period?`}
            />
          </Card>
          <Card hoverable={true}>
            <Meta
              title="Data Deep Dive"
              description={`Only interested in seeing a subset of the data? No problem.
              Filter the data set to get only the info you need.`}
            />
          </Card>
        </article>
        ,
      </Page>
    );
  }
}

export default CatalogPage;
