import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Card, Spin } from 'antd';

// tslint:disable-next-line: no-empty-interface
interface BarGraphProps {
  graphSettings: string;
}

interface DataSetObj {
  label: string;
  backgroundColor: string[];
  data: number[];
}

interface DataObj {
  labels: string[];
  datasets: DataSetObj[];
}

interface BarGraphState {
  isLoading: boolean;
  BarGraphData: number[];
  data: DataObj;
}

class BarGraph extends React.Component<BarGraphProps, BarGraphState> {
  public constructor(props: BarGraphProps) {
    super(props);
    this.state = {
      isLoading: true,
      BarGraphData: [],
      data: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: [],
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
        '/api/verticalbargraphs/' + this.props.graphSettings
      );

      const BarGraphData: number[] = [];
      response.data.forEach(
        (p: {
          GROUP1: number;
          GROUP2: number;
          GROUP3: number;
          GROUP4: number;
          GROUP5: number;
          GROUP6: number;
          GROUP7: number;
          GROUP8: number;
          GROUP9: number;
          GROUP10: number;
          GROUP11: number;
        }) =>
          BarGraphData.push(
            p.GROUP1,
            p.GROUP2,
            p.GROUP3,
            p.GROUP4,
            p.GROUP5,
            p.GROUP6,
            p.GROUP7,
            p.GROUP8,
            p.GROUP9,
            p.GROUP10,
            p.GROUP11
          )
      );

      this.setState({
        ...this.state,
        isLoading: false,
        BarGraphData,
        data: {
          labels: [
            'Ages 0-9',
            'Ages 10-18',
            'Ages 19-25',
            'Ages 25-65',
            'Ages 65+',
          ],
          datasets: [
            {
              label: this.props.graphSettings + ' ',
              backgroundColor: [
                'rgba(52, 8, 52, 1)',
                'rgba(80, 17, 68, 1)',
                'rgba(112, 31, 71, 1)',
                'rgba(172, 74, 78, 1)',
                'rgba(238, 146, 64, 1)',
              ],
              data: BarGraphData,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    if (this.props.graphSettings === 'Victims') {
      return (
        <Card title="Age Ranges of Victims">
          {!this.state.isLoading ? (
            <div style={{ height: 300 }}>
              <Bar
                options={{
                  legend: {
                    display: false,
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                data={this.state.data}
              />
            </div>
          ) : (
            <Spin tip="Loading...">
              <div style={{ height: 300 }}>
                <Bar
                  options={{
                    legend: {
                      display: false,
                    },
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
    } else {
      return (
        <Card title="Age Ranges of Suspects">
          {!this.state.isLoading ? (
            <div style={{ height: 300 }}>
              <Bar
                options={{
                  legend: {
                    display: false,
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                data={this.state.data}
              />
            </div>
          ) : (
            <Spin tip="Loading...">
              <div style={{ height: 300 }}>
                <Bar
                  options={{
                    legend: {
                      display: false,
                    },
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
