import React from 'react';
import axios from 'axios';
import { Line, Polar, Bar, HorizontalBar } from 'react-chartjs-2';
import { Card, Select, Alert, Spin } from 'antd';

// tslint:disable-next-line: no-empty-interface
interface BarGraphProps {
  graphSettings: string;
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

interface BarGraphState {
  years: string[];
  currentYear: string;
  isLoading: boolean;
  someLabels: string[];
  BarGraphData: number[];
  data: DataObj;
}

class BarGraph extends React.Component<BarGraphProps, BarGraphState> {
  public constructor(props: BarGraphProps) {
    super(props);
    this.state = {
      years: ['2013', '2014', '2015', '2016', '2017', '2018'],
      currentYear: '2013',
      isLoading: true,
      someLabels: [],
      BarGraphData: [],
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
    this.fetchBarGraphData();
  }

  private fetchBarGraphData = async () => {
    try {
      const response = await axios.get(
        '/api/bargraphs/' +
          this.props.graphSettings +
          '/' +
          this.state.currentYear
      );

      const BarGraphData: number[] = [];
      const someLabels: string[] = [];

      if (this.props.graphSettings === 'byguntype') {
        response.data.forEach((p: { N_KILLED: number }) =>
          BarGraphData.push(p.N_KILLED)
        );
        response.data.forEach((p: { TYPE: string }) => someLabels.push(p.TYPE));
      } else if (this.props.graphSettings === 'mostlethalincidents') {
        response.data.forEach((p: { N_KILLED: number }) =>
          BarGraphData.push(p.N_KILLED)
        );
        response.data.forEach((p: { INCIDENT_DETAILS: string }) =>
          someLabels.push(p.INCIDENT_DETAILS)
        );
      } else if (this.props.graphSettings === 'mostdangerousstates') {
        response.data.forEach((p: { N_KILLED: number }) =>
          BarGraphData.push(p.N_KILLED)
        );
        response.data.forEach((p: { STATE: string }) =>
          someLabels.push(p.STATE)
        );
      } else {
        response.data.forEach((p: { INCIDENTCOUNT: number }) =>
          BarGraphData.push(p.INCIDENTCOUNT)
        );
        response.data.forEach((p: { RELATIONSHIP: string }) =>
          someLabels.push(p.RELATIONSHIP)
        );
      }

      if (this.props.graphSettings === 'mostlethalincidents') {
        this.setState({
          ...this.state,
          isLoading: false,
          BarGraphData,
          data: {
            labels: someLabels,
            datasets: [
              {
                label: 'Number of people killed in incident',
                backgroundColor: 'rgba(80, 17, 68, 1)',
                data: BarGraphData,
              },
            ],
          },
        });
      } else if (this.props.graphSettings === 'mostdangerousstates') {
        this.setState({
          ...this.state,
          isLoading: false,
          BarGraphData,
          data: {
            labels: someLabels,
            datasets: [
              {
                label: 'Deadliest states by year',
                backgroundColor: 'rgba(80, 17, 68, 1)',
                data: BarGraphData,
              },
            ],
          },
        });
      } else if (this.props.graphSettings === 'byguntype') {
        this.setState({
          ...this.state,
          isLoading: false,
          BarGraphData,
          data: {
            labels: someLabels,
            datasets: [
              {
                label: 'Deaths caused by gun',
                backgroundColor: 'rgba(80, 17, 68, 1)',
                data: BarGraphData,
              },
            ],
          },
        });
      } else {
        this.setState({
          ...this.state,
          isLoading: false,
          BarGraphData,
          data: {
            labels: someLabels,
            datasets: [
              {
                label: 'Number of gun incidents',
                backgroundColor: 'rgba(80, 17, 68, 1)',
                data: BarGraphData,
              },
            ],
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  public yearChange = (value: string) => {
    this.setState(
      {
        isLoading: true,
        currentYear: value,
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
        this.fetchBarGraphData();
      }
    );
  };

  public render() {
    if (this.props.graphSettings === 'mostdangerousstates') {
      const { currentYear } = this.state;
      return (
        <Card>
          <Select
            defaultValue={currentYear}
            onChange={this.yearChange}
            showSearch={false}
            style={{ width: 150 }}
          >
            {this.state.years.map((item, index) => (
              <Select.Option value={item} key={index}>
                {item}
              </Select.Option>
            ))}
          </Select>
          {!this.state.isLoading ? (
            <div style={{ height: 1200 }}>
              <HorizontalBar
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  tooltips: { enabled: false },
                  hover: { mode: null },
                  scales: {
                    xAxes: [
                      {
                        ticks: {
                          display: false,
                        },
                      },
                    ],
                  },
                }}
                data={this.state.data}
              />
            </div>
          ) : (
            <Spin tip="Loading...">
              <div style={{ height: 1200 }}>
                <HorizontalBar
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: { enabled: false },
                    hover: { mode: null },
                    scales: {
                      xAxes: [
                        {
                          ticks: {
                            display: false,
                          },
                        },
                      ],
                    },
                  }}
                  data={this.state.data}
                />
              </div>
            </Spin>
          )}
        </Card>
      );
    } else {
      return (
        <Card>
          {!this.state.isLoading ? (
            <div style={{ height: 800 }}>
              <HorizontalBar
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                data={this.state.data}
              />
            </div>
          ) : (
            <Spin tip="Loading...">
              <div style={{ height: 800 }}>
                <HorizontalBar
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  data={this.state.data}
                />
              </div>
            </Spin>
          )}
        </Card>
      );
    }
  }
}

export default BarGraph;
