import React, { useState } from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import NationalTrends from './Graphs/NationalTrends';
import BarGraph from './Graphs/VerticalBarGraphs';
import PieGraph from './Graphs/PieGraphs';
import StateComparisons from './Graphs/StateComparisons/StateComparisons';
import { Collapse, Switch, Card, Row, Col, Alert } from 'antd';
import styles from './DataVisualizations.module.less';

const { Panel } = Collapse;

const DataVisualizations = () => {
  const [showingTrends, setShowingTrends] = useState<boolean>(true);
  const [showingDemographics, setShowingDemographics] = useState<boolean>(true);
  const [showingGuns, setShowingGuns] = useState<boolean>(true);

  const toggleTrends = (showing: boolean) => setShowingTrends(showing);
  const toggleDemographics = (showing: boolean) =>
    setShowingDemographics(showing);
  const toggleGuns = (showing: boolean) => setShowingGuns(showing);

  return (
    <Page title={PageEnum.DATA_VISUALIZATIONS.title}>
      <Collapse defaultActiveKey={['2']} style={{ marginBottom: '50px' }}>
        <Panel header="Disclaimers" key="1">
          <ul>
            <li>
              2 incidents (includes the Las Vegas shooting) were manually
              removed from the original dataset due to issues with data
              scraping.
            </li>
            <li>
              A number of incidents are missing from the years 2013 and 2018.
            </li>
          </ul>
        </Panel>
        <Panel header="Customize Dashboard" key="2">
          <section
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
          >
            <div>
              Gun Crime Trends&nbsp;&nbsp;
              <Switch defaultChecked={showingTrends} onClick={toggleTrends} />
            </div>
            <div>
              Demographic Information&nbsp;&nbsp;
              <Switch
                defaultChecked={showingDemographics}
                onClick={toggleDemographics}
              />
            </div>
            <div>
              Gun Information&nbsp;&nbsp;
              <Switch defaultChecked={showingGuns} onClick={toggleGuns} />
            </div>
          </section>
        </Panel>
      </Collapse>

      {showingTrends ? (
        <section className={styles.dataVisualization}>
          <h2>Gun Crime Trends</h2>
          <StateComparisons className={styles.dataVisualization} />

          <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            <NationalTrends />
            <Card>
              <h3>Notes</h3>
              According to the U.S. Census Bureau, the national population has
              increased approximately 2.12 percent from 318.39 million in 2014
              to 325.15 million in 2017. However, the number of gun deaths has
              increased by over 20 percent during the same period.
            </Card>
          </section>
        </section>
      ) : null}
      {showingDemographics ? (
        <>
          <section className={styles.dataVisualization}>
            <h2>Demographic Information</h2>
            <section
              style={{ display: 'grid', gridTemplateColumns: '10fr 14fr' }}
            >
              <Card>
                <h3>Notes</h3>
                Even though the female population has been approximately 3
                percent higher than the male population for the last couple of
                years, the number of gun death caused by males is
                unproportionally higher, with men accounting for over 90 percent
                of the total gun deaths in the United States. According to the
                gun crime data, males aged between 19–25 are most likely to
                commit gun-related crimes.
              </Card>
              <PieGraph graphSettings="bygender" />
            </section>
          </section>
          <section className={styles.dataVisualization}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: '25px',
              }}
            >
              <BarGraph graphSettings="Victims" />
              <BarGraph graphSettings="Suspects" />
            </div>
          </section>
        </>
      ) : null}
      {showingGuns ? (
        <section className={styles.dataVisualization}>
          <h2>Gun Information</h2>
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
            }}
          >
            <Card>
              <h3>Notes</h3>
              Stolen guns are almost 10 times more likely to be involved in gun
              crimes than legally owned guns, which usually require background
              checks before purchase.
            </Card>
            <PieGraph graphSettings="isstolen" />
          </section>
        </section>
      ) : null}
      {!showingTrends && !showingDemographics && !showingGuns ? (
        <Alert
          message="Customize your dashboard to view gun crime visualizations."
          type="info"
        />
      ) : null}
    </Page>
  );
};

export default DataVisualizations;
