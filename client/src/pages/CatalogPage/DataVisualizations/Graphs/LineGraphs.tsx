import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card } from 'antd';

// tslint:disable-next-line: no-empty-interface
interface LineGraphProps {}

interface DataSetObj {
  label: string;
  backgroundColor: string;
  data: number[];
}

interface DataObj {
  labels: string[];
  datasets: DataSetObj[];
}

interface LineGraphState {
  waitingForLineGraphData: boolean;
  LineGraphData: number[];
  data: DataObj;
}

class LineGraph extends React.Component<LineGraphProps, LineGraphState> {
  public constructor(props: LineGraphProps) {
    super(props);
    this.state = {
      waitingForLineGraphData: true,
      LineGraphData: [],
      data: {
        labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
        datasets: [
          {
            label: 'number of people killed',
            backgroundColor: 'rgba(51,0,102, 0.7)',
            data: [],
          },
        ],
      },
    };
    this.fetchLineGraphData();
  }

  private fetchLineGraphData = async () => {
    try {
      const response = await axios.get('/api/linegraphs/deathsperyear');

      const LineGraphData: number[] = [];
      response.data.forEach((p: { DEATHS: number }) =>
        LineGraphData.push(p.DEATHS)
      );

      this.setState({
        ...this.state,
        waitingForLineGraphData: false,
        LineGraphData,
        data: {
          labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
          datasets: [
            {
              label: 'number of people killed',
              backgroundColor: 'rgba(74,35,90, 0.6)',
              data: LineGraphData,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    return (
      <Card title="Gun Deaths Per Year">
        <Line
          options={{
            responsive: true,
          }}
          data={this.state.data}
        />
      </Card>
    );
  }
}

export default LineGraph;