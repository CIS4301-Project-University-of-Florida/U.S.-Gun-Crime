import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import { Collapse, Tabs } from 'antd';
import DeadliestStates from './DeadliestStates';
import DeadliestIncidents from './DeadliestIncidents';
import DeadliestGuns from './DeadliestGuns';
import AtRiskRelationships from './AtRiskRelationships';
import { Link } from 'react-router-dom';

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
                <li>
                  Exact numbers are not provided for the Deaths Per Capita by
                  State ranking. For more specific information, please use the{' '}
                  <Link to={PageEnum.DEEP_DIVE.url}>Search Tool.</Link>
                </li>
              </ul>
            </Panel>
          </Collapse>
          <br />
          <Tabs defaultActiveKey="1">
            <TabPane tab="Deaths Per Capita by State" key="1">
              <DeadliestStates />
            </TabPane>
            <TabPane tab="Deadliest Incidents" key="2">
              <DeadliestIncidents />
            </TabPane>
            <TabPane tab="Deadliest Guns" key="3">
              <DeadliestGuns />
            </TabPane>
            <TabPane tab="Most At-Risk Relationships" key="4">
              <AtRiskRelationships />
            </TabPane>
          </Tabs>
        </Page>
      </div>
    );
  }
}

export default Rankings;
