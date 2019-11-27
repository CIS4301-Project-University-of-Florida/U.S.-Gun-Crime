import React from 'react';
import axios from 'axios';
import { Doughnut, Pie, Polar, Bar, Scatter } from 'react-chartjs-2';
import { Card } from 'antd';

// tslint:disable-next-line: no-empty-interface
interface DonutGraphProps {
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

interface DonutGraphState {
  waitingForDonutGraphData: boolean;
  DonutGraphrData: number[];
  data: DataObj;
}

class DonutGraph extends React.Component<DonutGraphProps, DonutGraphState> {
  public constructor(props: DonutGraphProps) {
    super(props);
    this.state = {
      waitingForDonutGraphData: true,
      DonutGraphrData: [],
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
    this.fetchDonutGraphData();
  }

  private fetchDonutGraphData = async () => {
    try {
      const response = await axios.get(
        '/api/donutgraphs/' + this.props.graphSettings
      );

      const DonutGraphrData: number[] = [];
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
          DonutGraphrData.push(
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
        waitingForDonutGraphData: false,
        DonutGraphrData,
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
              label:
                this.props.graphSettings + ' involved in gun crime incidents',
              backgroundColor: [
                'rgba(52, 8, 52, 1)',
                'rgba(80, 17, 68, 1)',
                'rgba(112, 31, 71, 1)',
                'rgba(172, 74, 78, 1)',
                'rgba(238, 146, 64, 1)',
              ],
              data: DonutGraphrData,
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
          <div style={{ height: 300 }}>
            <Bar
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              data={this.state.data}
            />
          </div>
        </Card>
      );
    } else {
      return (
        <Card title="Age Ranges of Suspects">
          <div style={{ height: 300 }}>
            <Bar
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              data={this.state.data}
            />
          </div>
        </Card>
      );
    }
  }
}

export default DonutGraph;
