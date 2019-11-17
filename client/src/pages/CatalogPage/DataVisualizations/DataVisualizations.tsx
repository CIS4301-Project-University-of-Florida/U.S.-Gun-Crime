import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import LineGraph from './Graphs/LineGraphs';
import DonutGraph from './Graphs/DonutGraphs';
import PolarGraph from './Graphs/PolarGraphs';
import StateComparisons from './Graphs/StateComparisons/StateComparisons';
import { Collapse, Switch } from 'antd';

const { Panel } = Collapse;

interface DataVisualizationsProps {}

interface DataVisualizationsState {
  stateComparisonsShowing: boolean;
}

class DataVisualizations extends React.Component<
  DataVisualizationsProps,
  DataVisualizationsState
> {
  public constructor(props: DataVisualizationsProps) {
    super(props);
    this.state = {
      stateComparisonsShowing: true,
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
                checkedChildren={'State Comparisons'}
                unCheckedChildren={'State Comparisons'}
                defaultChecked={true}
                // tslint:disable-next-line: jsx-no-lambda
                onClick={() =>
                  this.setState({
                    stateComparisonsShowing: !this.state
                      .stateComparisonsShowing,
                  })
                }
              />
            </Panel>
          </Collapse>
          <br />
          {this.state.stateComparisonsShowing ? <StateComparisons /> : null}
          <br />
          <LineGraph />
          <br />
          <DonutGraph graphSettings="Victims" />
          <br />
          <DonutGraph graphSettings="Suspects" />
          <br />
          <PolarGraph graphSettings="bygender" />
          <br />
          <PolarGraph graphSettings="isstolen" />
        </Page>
      </div>
    );
  }
}

export default DataVisualizations;
