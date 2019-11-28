import React from 'react';
import axios from 'axios';
import { darkPink } from '../DataVisualizations/chartColors';
import HorizontalBarGraph from './HorizontalBarGraph';
import * as chartjs from 'chart.js';
import { ChartData } from 'react-chartjs-2';

interface DeadliestIncidentsState {
  isLoading: boolean;
  incidentLabels: string[];
  data: ChartData<chartjs.ChartData>;
}

class DeadliestIncidents extends React.Component<{}, DeadliestIncidentsState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      incidentLabels: [],
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
    this.fetchDeadliestIncidentsData();
  }

  private fetchDeadliestIncidentsData = async () => {
    try {
      const response = await axios.get(`/api/incident/deadliest/${30}`);

      const incidentDeaths: number[] = [];
      const incidentLabels: string[] = [];

      response.data.forEach((incident: { LABEL: string; N_KILLED: number }) => {
        incidentDeaths.push(incident.N_KILLED);
        incidentLabels.push(incident.LABEL);
      });

      this.setState({
        ...this.state,
        isLoading: false,
        data: {
          labels: incidentLabels,
          datasets: [
            {
              label: 'Number of people killed',
              backgroundColor: darkPink,
              data: incidentDeaths,
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
        showxAxisTicks={true}
        showTooltips={true}
      />
    );
  }
}

export default DeadliestIncidents;
