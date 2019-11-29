import React from 'react';
import axios from 'axios';
import { Doughnut, ChartData } from 'react-chartjs-2';
import { orange, fadedRed, darkPink } from '../chartColors';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import * as chartjs from 'chart.js';

interface CrimesByGenderState {
  isLoading: boolean;
  numberOfCrimes: number[];
  data: ChartData<chartjs.ChartData>;
}

class CrimesByGender extends React.Component<{}, CrimesByGenderState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      numberOfCrimes: [],
      data: {
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
    };
  }

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    try {
      const response = await axios.get(
        '/api/participant/numberOfCrimesByGender'
      );

      const numberOfCrimes: number[] = [];

      response.data.forEach((p: { N_CRIMES: number }) =>
        numberOfCrimes.push(p.N_CRIMES)
      );

      this.setState({
        ...this.state,
        isLoading: false,
        numberOfCrimes,
        data: {
          labels: ['Male', 'Female', 'Unknown'],
          datasets: [
            {
              backgroundColor: [darkPink, fadedRed, orange],
              data: numberOfCrimes,
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
          <Doughnut
            options={{
              responsive: true,
            }}
            data={this.state.data}
          />
        </LoadingSpin>
      </div>
    );
  }
}

export default CrimesByGender;
