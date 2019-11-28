import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Card, Spin } from 'antd';

interface DataSetObj {
  label: string;
  backgroundColor: string;
  data: number[];
}

interface DataObj {
  labels: string[];
  datasets: DataSetObj[];
}

interface NationalTrendsState {
  isLoading: boolean;
  nationalTrendsData: number[];
  data: DataObj;
}

class NationalTrends extends React.Component<{}, NationalTrendsState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      nationalTrendsData: [],
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
    this.fetchnationalTrendsData();
  }

  private fetchnationalTrendsData = async () => {
    try {
      const response = await axios.get('/api/linegraphs/deathsperyear');

      const nationalTrendsData: number[] = [];
      response.data.forEach((p: { DEATHS: number }) =>
        nationalTrendsData.push(p.DEATHS)
      );

      this.setState({
        ...this.state,
        isLoading: false,
        nationalTrendsData,
        data: {
          labels: ['2013', '2014', '2015', '2016', '2017', '2018'],
          datasets: [
            {
              label: 'National gun deaths by year',
              backgroundColor: 'rgba(52, 8, 52, 1)',
              data: nationalTrendsData,
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

export default NationalTrends;
