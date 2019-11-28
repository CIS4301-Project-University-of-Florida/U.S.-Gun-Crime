import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card, Spin } from 'antd';
import { Select } from 'antd';
import states from './states';

interface StateComparisonProps {
  className: string;
}

interface StateComparisonState {
  stateOne: string;
  stateTwo: string;
  isLoading: boolean;
  data: DataObj;
}

interface DataSetObj {
  label: string;
  backgroundColor: string;
  data: number[];
}

interface DataObj {
  labels: string[];
  datasets: DataSetObj[];
}

class StateComparisons extends React.Component<
  StateComparisonProps,
  StateComparisonState
> {
  public constructor(props: StateComparisonProps) {
    super(props);
    this.state = {
      stateOne: states[0],
      stateTwo: states[2],
      isLoading: true,
      data: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: '',
            data: [],
          },
        ],
      },
    };
  }

  public componentDidMount() {
    this.fetchLineGraphData();
  }

  private fetchLineGraphData = async () => {
    try {
      const response1 = await axios.get(
        '/api/statecomparisons/deathsperyear/' + this.state.stateOne
      );

      const deathsPerYear1: number[] = [];
      response1.data.forEach((p: { DEATHS: number }) =>
        deathsPerYear1.push(p.DEATHS)
      );

      const response2 = await axios.get(
        '/api/statecomparisons/deathsperyear/' + this.state.stateTwo
      );

      const deathsPerYear2: number[] = [];
      response2.data.forEach((p: { DEATHS: number }) =>
        deathsPerYear2.push(p.DEATHS)
      );

      this.setState({
        ...this.state,
        isLoading: false,
        data: {
          labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
          datasets: [
            {
              label: 'Gun deaths by year in ' + this.state.stateOne,
              backgroundColor: 'rgba(80, 17, 68, 0.7)',
              data: deathsPerYear1,
            },
            {
              label: 'Gun deaths by year in ' + this.state.stateTwo,
              backgroundColor: 'rgba(80, 17, 68, 0.8)',
              data: deathsPerYear2,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  public onStateOneChange = (value: string) => {
    this.setState(
      {
        stateOne: value,
        isLoading: true,
        data: {
          labels: [],
          datasets: [
            {
              label: '',
              backgroundColor: '',
              data: [],
            },
          ],
        },
      },
      () => {
        this.fetchLineGraphData();
      }
    );
  };

  public onStateTwoChange = (value: string) => {
    this.setState(
      {
        stateTwo: value,
        isLoading: true,
        data: {
          labels: [],
          datasets: [
            {
              label: '',
              backgroundColor: '',
              data: [],
            },
          ],
        },
      },
      () => {
        this.fetchLineGraphData();
      }
    );
  };

  public render() {
    const { stateOne, stateTwo } = this.state;
    return (
      <section className={this.props.className}>
        <Card title="State Comparisons">
          <div style={{ marginBottom: '20px' }}>
            <Select
              defaultValue={stateOne}
              onChange={this.onStateOneChange}
              showSearch={true}
              style={{ width: 150 }}
            >
              {states.map((item, index) => (
                <Select.Option value={item} key={`${index}1`}>
                  {item}
                </Select.Option>
              ))}
            </Select>
            &#160;
            <Select
              defaultValue={stateTwo}
              onChange={this.onStateTwoChange}
              showSearch={true}
              style={{ width: 150 }}
            >
              {states.map((item, index) => (
                <Select.Option value={item} key={`${index}2`}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          {!this.state.isLoading ? (
            <Line
              options={{
                responsive: true,
              }}
              data={this.state.data}
              redraw={true}
            />
          ) : (
            <Spin tip="Loading...">
              <Line
                options={{
                  responsive: true,
                }}
                data={this.state.data}
                redraw={true}
              />
            </Spin>
          )}
        </Card>
      </section>
    );
  }
}

export default StateComparisons;
