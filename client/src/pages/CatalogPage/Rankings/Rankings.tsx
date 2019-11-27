import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import { Collapse, Tabs } from 'antd';
import BarGraph from './BarGraphs';

const { Panel } = Collapse;

const { TabPane } = Tabs;

class Rankings extends React.Component {
  public render() {
    return (
      <div>
        <Page title={PageEnum.RANKINGS.title}>
          <Collapse>
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
          </Collapse>
          <br />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Most Lethal Incidents" key="1">
              <BarGraph graphSettings="mostlethalincidents" />
            </TabPane>
            <TabPane tab="States most affected by Gun Crime" key="2">
              <BarGraph graphSettings="mostdangerousstates" />
            </TabPane>
            <TabPane tab="Deadliest Guns" key="3">
              <BarGraph graphSettings="byguntype" />
            </TabPane>
            <TabPane tab="Highest At Risk Relationships" key="4">
              <BarGraph graphSettings="byrelationship" />
            </TabPane>
          </Tabs>
        </Page>
      </div>
    );
  }
}

export default Rankings;
