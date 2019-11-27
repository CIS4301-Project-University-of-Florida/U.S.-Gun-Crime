import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import LineGraph from './Graphs/LineGraphs';
import BarGraph from './Graphs/VerticalBarGraphs';
import PieGraph from './Graphs/PieGraphs';
import StateComparisons from './Graphs/StateComparisons/StateComparisons';
import { Collapse, Switch, Card, Row, Col, Alert } from 'antd';

const { Panel } = Collapse;

// tslint:disable-next-line: no-empty-interface
interface DataVisualizationsProps {}

interface DataVisualizationsState {
  showingtrends: boolean;
  showingdemoinfo: boolean;
  showingguninfo: boolean;
}

class DataVisualizations extends React.Component<
  DataVisualizationsProps,
  DataVisualizationsState
> {
  public constructor(props: DataVisualizationsProps) {
    super(props);
    this.state = {
      showingtrends: true,
      showingdemoinfo: false,
      showingguninfo: false,
    };
  }

  public render() {
    return (
      <div>
        <Page title={PageEnum.DATA_VISUALIZATIONS.title}>
          <Collapse defaultActiveKey={['2']}>
            <Panel header="Disclaimers" key="1">
              <ul>
                <li>
                  2 incidents (includes the Las Vegas shooting) were manually
                  removed from the original dataset due to issues while data
                  gathering.
                </li>
                <li>
                  The list of incidents from 2013 and 2018 are incomplete.
                </li>
              </ul>
            </Panel>
            <Panel header="Customize Dashboard" key="2">
              <Row gutter={16}>
                <Col span={8}>
                  Gun Crime Trends&nbsp;&nbsp;
                  <Switch
                    defaultChecked={this.state.showingtrends}
                    // tslint:disable-next-line: jsx-no-lambda
                    onClick={() =>
                      this.setState({
                        showingtrends: !this.state.showingtrends,
                      })
                    }
                  />
                </Col>
                <Col span={8}>
                  Demographic Information&nbsp;&nbsp;
                  <Switch
                    defaultChecked={this.state.showingdemoinfo}
                    // tslint:disable-next-line: jsx-no-lambda
                    onClick={() =>
                      this.setState({
                        showingdemoinfo: !this.state.showingdemoinfo,
                      })
                    }
                  />
                </Col>
                <Col span={8}>
                  Gun Information&nbsp;&nbsp;
                  <Switch
                    defaultChecked={this.state.showingguninfo}
                    // tslint:disable-next-line: jsx-no-lambda
                    onClick={() =>
                      this.setState({
                        showingguninfo: !this.state.showingguninfo,
                      })
                    }
                  />
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <br />
          {this.state.showingtrends ? (
            <div>
              <h3>Gun Crime Trends</h3>
              <StateComparisons />
              <br />
              <Row gutter={16}>
                <Col span={16}>
                  <LineGraph />
                </Col>
                <Col span={8}>
                  <Card>
                    <h2>Notes</h2>
                    According to the US Census Bureau, the national population
                    has increased approximately 2.12 percent from 318.39 million
                    in 2014 to 325.15 million in 2017. However, the number of
                    gun deaths has increased by over 20 percent during the same
                    period.
                  </Card>
                </Col>
              </Row>
              <br />
            </div>
          ) : null}
          {this.state.showingdemoinfo ? (
            <div>
              <h3>Demographic Information</h3>
              <Row gutter={16}>
                <Col span={10}>
                  <Card>
                    <h2>Notes</h2>
                    Even though the female population has been approximately 3
                    percent higher than the male population for the last couple
                    of years, the number of gun death caused by males is
                    unproportionally higher with men accounting for over 90
                    percent of the total gun deaths in the United States.
                    According to the gun crime data, males aged between 19-25
                    are most likely to commit gun related crime.
                  </Card>
                </Col>
                <Col span={14}>
                  <PieGraph graphSettings="bygender" />
                </Col>
              </Row>
              <br />
              <Row gutter={16}>
                <Col span={12}>
                  <BarGraph graphSettings="Victims" />
                </Col>
                <Col span={12}>
                  <BarGraph graphSettings="Suspects" />
                </Col>
              </Row>
              <br />
            </div>
          ) : null}
          {this.state.showingguninfo ? (
            <div>
              <h3>Gun Information</h3>
              <Row gutter={16}>
                <Col span={8}>
                  <Card>
                    <h2>Notes</h2>
                    Stolen guns are almost ten times more likely to be involved
                    in gun crime than legal guns which usually require mandatory
                    background checks before purchase.
                  </Card>
                </Col>
                <Col span={16}>
                  <PieGraph graphSettings="isstolen" />
                </Col>
              </Row>
              <br />
            </div>
          ) : null}
          {!this.state.showingtrends &&
          !this.state.showingdemoinfo &&
          !this.state.showingguninfo ? (
            <Alert
              message="Customize your dashboard to view gun crime visualizations."
              type="info"
            />
          ) : null}
        </Page>
      </div>
    );
  }
}

export default DataVisualizations;
