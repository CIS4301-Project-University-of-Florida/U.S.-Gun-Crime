import React from 'react';
import axios from 'axios';
import { Line, ChartData } from 'react-chartjs-2';
import { darkerPurple } from '../chartColors';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import * as chartjs from 'chart.js';

interface NationalTrendsState {
  isLoading: boolean;
  nationalTrendsData: number[];
  data: ChartData<chartjs.ChartData>;
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
        <LoadingSpin spinning={this.state.isLoading}>
          <Line
            options={{
              responsive: true,
              legend: {
                display: false,
              },
            }}
            data={this.state.data}
          />
        </LoadingSpin>
      </div>
    );
  }
}

export default NationalTrends;
