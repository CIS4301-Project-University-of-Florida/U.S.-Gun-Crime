import React from 'react';
import axios from 'axios';
import { Doughnut, Pie, Polar } from 'react-chartjs-2';
import { Card } from 'antd';

// tslint:disable-next-line: no-empty-interface
interface DonutGraphProps {
  graphSettings: string;
}

interface DataSetObj {
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
            'ages 0-9',
            'ages 10-19',
            'ages 20-29',
            'ages 30-39',
            'ages 40-49',
            'ages 50-59',
            'ages 60-69',
            'ages 70-79',
            'ages 80-89',
            'ages 90-99',
            'ages 100-109',
          ],
          datasets: [
            {
              backgroundColor: [
                'rgba(79, 23, 107, 1)',
                'rgba(215, 219, 213, 1)',
                'rgba(29, 0, 97, 1)',
                'rgba(58, 152, 145, 1)',
                'rgba(45, 124, 237, 1)',
                'rgba(79, 23, 72, 0.88)',
                'rgba(79, 23, 89, 1)',
                'rgba(79, 23, 107, 1)',
                'rgba(79, 23, 107, 1)',
                'rgba(79, 23, 107, 1)',
                'rgba(79, 23, 107, 1)',
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
          <Doughnut
            options={{
              responsive: true,
            }}
            data={this.state.data}
          />
        </Card>
      );
    } else {
      return (
        <Card title="Age Ranges of Suspects">
          <Doughnut
            options={{
              responsive: true,
            }}
            data={this.state.data}
          />
        </Card>
      );
    }
  }
}

export default DonutGraph;
