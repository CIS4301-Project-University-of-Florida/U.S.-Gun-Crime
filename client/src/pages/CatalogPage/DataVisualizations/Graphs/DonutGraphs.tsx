import React from 'react';
import axios from 'axios';
import { Doughnut, Pie } from 'react-chartjs-2';
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
            '0-9',
            '10-19',
            '20-29',
            '30-39',
            '40-49',
            '50-59',
            '60-69',
            '70-79',
            '80-89',
            '90-99',
            '100-109',
          ],
          datasets: [
            {
              backgroundColor: [
                'rgba(74,35,90, 0.8)',
                'rgba(89,44,95, 0.8)',
                'rgba(108,52,131, 0.8)',
                'rgba(112,60,152, 0.8)',
                'rgba(21,67,96, 0.8)',
                'rgba(26,82,118, 0.8)',
                'rgba(21,97,189, 0.8)',
                'rgba(36,113,163, 0.8)',
                'rgba(33,97,188, 1, 0.8)',
                'rgba(40,116,166, 0.8)',
                'rgba(46,182,193, 0.8)',
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
          <Pie
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
          <Pie
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
