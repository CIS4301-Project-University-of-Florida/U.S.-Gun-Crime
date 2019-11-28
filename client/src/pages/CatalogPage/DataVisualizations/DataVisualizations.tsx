import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import LineGraph from './Graphs/LineGraphs';
import BarGraph from './Graphs/VerticalBarGraphs';
import PieGraph from './Graphs/PieGraphs';
import StateComparisons from './Graphs/StateComparisons/StateComparisons';
import { Collapse, Switch, Card, Row, Col, Alert } from 'antd';
import styles from './DataVisualizations.module.less';

const { Panel } = Collapse;

// tslint:disable-next-line: no-empty-interface
interface DataVisualizationsProps {}

interface DataVisualizationsState {
  showingTrends: boolean;
  showingDemoInfo: boolean;
  showingGunInfo: boolean;
}

class DataVisualizations extends React.Component<
  DataVisualizationsProps,
  DataVisualizationsState
> {
  public constructor(props: DataVisualizationsProps) {
    super(props);
    this.state = {
      showingTrends: true,
      showingDemoInfo: true,
      showingGunInfo: true,
    };
  }

  public render() {
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
            <Row gutter={16}>
              <Col span={8}>
                Gun Crime Trends&nbsp;&nbsp;
                <Switch
                  defaultChecked={this.state.showingTrends}
                  // tslint:disable-next-line: jsx-no-lambda
                  onClick={() =>
                    this.setState({
                      showingTrends: !this.state.showingTrends,
                    })
                  }
                />
              </Col>
              <Col span={8}>
                Demographic Information&nbsp;&nbsp;
                <Switch
                  defaultChecked={this.state.showingDemoInfo}
                  // tslint:disable-next-line: jsx-no-lambda
                  onClick={() =>
                    this.setState({
                      showingDemoInfo: !this.state.showingDemoInfo,
                    })
                  }
                />
              </Col>
              <Col span={8}>
                Gun Information&nbsp;&nbsp;
                <Switch
                  defaultChecked={this.state.showingGunInfo}
                  // tslint:disable-next-line: jsx-no-lambda
                  onClick={() =>
                    this.setState({
                      showingGunInfo: !this.state.showingGunInfo,
                    })
                  }
                />
              </Col>
            </Row>
          </Panel>
        </Collapse>

        {this.state.showingTrends ? (
          <section className={styles.dataVisualization}>
            <h2>Gun Crime Trends</h2>
            <StateComparisons className={styles.dataVisualization} />

            <Row gutter={16}>
              <Col span={16}>
                <LineGraph />
              </Col>
              <Col span={8}>
                <Card>
                  <h3>Notes</h3>
                  According to the U.S. Census Bureau, the national population
                  has increased approximately 2.12 percent from 318.39 million
                  in 2014 to 325.15 million in 2017. However, the number of gun
                  deaths has increased by over 20 percent during the same
                  period.
                </Card>
              </Col>
            </Row>
          </section>
        ) : null}
        {this.state.showingDemoInfo ? (
          <>
            <section className={styles.dataVisualization}>
              <h2>Demographic Information</h2>
              <Row gutter={16}>
                <Col span={10}>
                  <Card>
                    <h3>Notes</h3>
                    Even though the female population has been approximately 3
                    percent higher than the male population for the last couple
                    of years, the number of gun death caused by males is
                    unproportionally higher, with men accounting for over 90
                    percent of the total gun deaths in the United States.
                    According to the gun crime data, males aged between 19–25
                    are most likely to commit gun-related crimes.
                  </Card>
                </Col>
                <Col span={14}>
                  <PieGraph graphSettings="bygender" />
                </Col>
              </Row>
            </section>
            <section className={styles.dataVisualization}>
              <Row gutter={16}>
                <Col span={12}>
                  <BarGraph graphSettings="Victims" />
                </Col>
                <Col span={12}>
                  <BarGraph graphSettings="Suspects" />
                </Col>
              </Row>
            </section>
          </>
        ) : null}
        {this.state.showingGunInfo ? (
          <section className={styles.dataVisualization}>
            <h2>Gun Information</h2>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <h3>Notes</h3>
                  Stolen guns are almost 10 times more likely to be involved in
                  gun crimes than legally owned guns, which usually require
                  background checks before purchase.
                </Card>
              </Col>
              <Col span={16}>
                <PieGraph graphSettings="isstolen" />
              </Col>
            </Row>
          </section>
        ) : null}
        {!this.state.showingTrends &&
        !this.state.showingDemoInfo &&
        !this.state.showingGunInfo ? (
          <Alert
            message="Customize your dashboard to view gun crime visualizations."
            type="info"
          />
        ) : null}
      </Page>
    );
  }
}

export default DataVisualizations;
