import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class Rankings extends React.Component {
  public render() {
    return (
      <div>
        <Page title={PageEnum.RANKINGS.title}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Most Lethal Incidents" key="1">
              (horizontal bar graph goes here)
            </TabPane>
            <TabPane tab="States most affected by Gun Crime" key="2">
              (horizontal bar graph goes here)
            </TabPane>
          </Tabs>
        </Page>
      </div>
    );
  }
}

export default Rankings;
