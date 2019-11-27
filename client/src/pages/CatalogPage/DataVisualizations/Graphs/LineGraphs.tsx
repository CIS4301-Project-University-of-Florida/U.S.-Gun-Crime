import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card, Spin } from 'antd';

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
  isLoading: boolean;
  LineGraphData: number[];
  data: DataObj;
}

class LineGraph extends React.Component<LineGraphProps, LineGraphState> {
  public constructor(props: LineGraphProps) {
    super(props);
    this.state = {
      isLoading: true,
      LineGraphData: [],
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
        isLoading: false,
        LineGraphData,
        data: {
          labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
          datasets: [
            {
              label: 'National gun deaths by year',
              backgroundColor: 'rgba(80, 17, 68, 1)',
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
      <Card title="National Gun Crime Trends">
        {!this.state.isLoading ? (
          <Line
            options={{
              responsive: true,
            }}
            data={this.state.data}
          />
        ) : (
          <Spin tip="Loading...">
            <Line
              options={{
                responsive: true,
              }}
              data={this.state.data}
            />
          </Spin>
        )}
      </Card>
    );
  }
}

export default LineGraph;
