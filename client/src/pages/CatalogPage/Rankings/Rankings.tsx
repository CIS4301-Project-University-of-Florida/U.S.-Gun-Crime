import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import { Tabs } from 'antd';
import BarGraph from './BarGraphs';

const { TabPane } = Tabs;

class Rankings extends React.Component {
  public render() {
    return (
      <div>
        <Page title={PageEnum.RANKINGS.title}>
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
