import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Spin } from 'antd';
import { darkerPurple } from '../chartColors';

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
  }

  public componentDidMount() {
    this.fetchNationalTrendsData();
  }

  private fetchNationalTrendsData = async () => {
    try {
      const response = await axios.get('/api/incident/deathsPerYear');

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
              label: '',
              backgroundColor: darkerPurple,
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
      <div>
        {!this.state.isLoading ? (
          <Line
            options={{
              responsive: true,
              legend: {
                display: false,
              },
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
      </div>
    );
  }
}

export default NationalTrends;
