import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import LineGraph from './Graphs/LineGraphs';
import DonutGraph from './Graphs/DonutGraphs';
import PolarGraph from './Graphs/PolarGraphs';
import BarGraph from './Graphs/BarGraphs';
import { Row, Col, Button, Collapse } from 'antd';

const { Panel } = Collapse;

class DataVisualizations extends React.Component {
  public render() {
    return (
      <div>
        <Page title={PageEnum.DATA_VISUALIZATIONS.title}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Customize Dashboard" key="1">
              <p>(to do)</p>
            </Panel>
            <Panel header="Disclaimers" key="2">
              <ul>
                <li>
                  The list of incidents from 2013 is not exhaustive; only 279
                  incidents from that year were catalogued. The list of
                  incidents only go uptil March of 2018.
                </li>
                <li>
                  2 incidents (includes the Las Vegas shooting) were manually
                  removed from the original dataset due to issues while data
                  gathering.
                </li>
              </ul>
            </Panel>
          </Collapse>
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
