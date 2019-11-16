import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import LineGraph from './Graphs/LineGraphs';
import DonutGraph from './Graphs/DonutGraphs';
import PolarGraph from './Graphs/PolarGraphs';
import BarGraph from './Graphs/BarGraphs';
import StateComparisons from './Graphs/StateComparisons/StateComparisons';
import { Row, Col, Button, Collapse, Switch } from 'antd';

const { Panel } = Collapse;

interface DataVisualizationsProps {}

interface DataVisualizationsState {
  showing: boolean;
}

class DataVisualizations extends React.Component<
  DataVisualizationsProps,
  DataVisualizationsState
> {
  public constructor(props: DataVisualizationsProps) {
    super(props);
    this.state = { showing: true };
  }

  public render() {
    return (
      <div>
        <Page title={PageEnum.DATA_VISUALIZATIONS.title}>
          <Collapse defaultActiveKey={['2']}>
            <Panel header="Disclaimers" key="1">
              <ul>
                <li>
                  The list of incidents from 2013 and 2018 are incomplete.
                </li>
                <li>
                  2 incidents (includes the Las Vegas shooting) were manually
                  removed from the original dataset due to issues while data
                  gathering.
                </li>
              </ul>
            </Panel>
            <Panel header="Customize Dashboard" key="2">
              <Switch
                defaultChecked
                // tslint:disable-next-line: jsx-no-lambda
                onClick={() => this.setState({ showing: !this.state.showing })}
              />
            </Panel>
          </Collapse>
          <br />
          {this.state.showing ? (
            <Row gutter={24}>
              <Col span={24}>
                <StateComparisons />
              </Col>
            </Row>
          ) : null}
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <LineGraph />
            </Col>
            <Col span={12}>
              <DonutGraph graphSettings="Victims" />
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <DonutGraph graphSettings="Suspects" />
            </Col>
            <Col span={12}>
              <PolarGraph graphSettings="bygender" />
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <PolarGraph graphSettings="isstolen" />
            </Col>
            <Col span={12}>
              <BarGraph graphSettings="byrelationship" />
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={12}>
              <BarGraph graphSettings="byguntype" />
            </Col>
          </Row>
        </Page>
      </div>
    );
  }
}

export default DataVisualizations;
