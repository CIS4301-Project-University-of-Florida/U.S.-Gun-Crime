import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card, Spin } from 'antd';
import { Select } from 'antd';
import states from './states';

interface LineGraphProps {
  className: string;
}

interface LineGraphState {
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

class StateComparisons extends React.Component<LineGraphProps, LineGraphState> {
  public constructor(props: LineGraphProps) {
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
      const response = await axios.get(
        '/api/statecomparisons/deathsperyear/' + this.state.stateOne
      );

      const LineGraphData: number[] = [];
      response.data.forEach((p: { DEATHS: number }) =>
        LineGraphData.push(p.DEATHS)
      );

      const response2 = await axios.get(
        '/api/statecomparisons/deathsperyear/' + this.state.stateTwo
      );

      const LineGraphData2: number[] = [];
      response2.data.forEach((p: { DEATHS: number }) =>
        LineGraphData2.push(p.DEATHS)
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
              data: LineGraphData,
            },
            {
              label: 'Gun deaths by year in ' + this.state.stateTwo,
              backgroundColor: 'rgba(80, 17, 68, 0.8)',
              data: LineGraphData2,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  public stateOneChange = (value: string) => {
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

  public stateTwoChange = (value: string) => {
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
              onChange={this.stateOneChange}
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
              onChange={this.stateTwoChange}
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
