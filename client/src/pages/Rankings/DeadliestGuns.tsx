import React from 'react';
import axios from 'axios';
import { fadedRed } from '../DataVisualizations/chartColors';
import HorizontalBarGraph from './HorizontalBarGraph';
import * as chartjs from 'chart.js';
import { ChartData } from 'react-chartjs-2';

interface DeadliestGunsState {
  isLoading: boolean;
  gunLabels: string[];
  data: ChartData<chartjs.ChartData>;
}

class DeadliestGuns extends React.Component<{}, DeadliestGunsState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      gunLabels: [],
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
    this.fetchDeadliestGunsData();
  }

  private fetchDeadliestGunsData = async () => {
    try {
      const response = await axios.get(`/api/gun/rankedByDeaths`);

      const gunDeaths: number[] = [];
      const gunLabels: string[] = [];

      response.data.forEach((gun: { TYPE: string; N_KILLED: number }) => {
        gunDeaths.push(gun.N_KILLED);
        gunLabels.push(gun.TYPE);
      });

      this.setState({
        isLoading: false,
        data: {
          labels: gunLabels,
          datasets: [
            {
              label: 'Deaths caused',
              backgroundColor: fadedRed,
              data: gunDeaths,
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
      <HorizontalBarGraph
        isLoading={this.state.isLoading}
        data={this.state.data}
        showTooltips={true}
        showxAxisTicks={true}
      />
    );
  }
}

export default DeadliestGuns;
