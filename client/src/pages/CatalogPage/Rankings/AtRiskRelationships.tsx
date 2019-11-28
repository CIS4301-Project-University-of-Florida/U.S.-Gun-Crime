import React from 'react';
import axios from 'axios';
import { orange } from '../DataVisualizations/chartColors';
import HorizontalBarGraph from './HorizontalBarGraph';
import * as chartjs from 'chart.js';
import { ChartData } from 'react-chartjs-2';

interface AtRiskRelationshipsState {
  isLoading: boolean;
  relationshipLabels: string[];
  data: ChartData<chartjs.ChartData>;
}

class AtRiskRelationships extends React.Component<
  {},
  AtRiskRelationshipsState
> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      relationshipLabels: [],
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
    this.fetchAtRiskRelationshipsData();
  }

  private fetchAtRiskRelationshipsData = async () => {
    try {
      const response = await axios.get(`/api/participant/atRiskRelationships`);

      const incidentDeaths: number[] = [];
      const relationshipLabels: string[] = [];

      response.data.forEach(
        (participant: { RELATIONSHIP: string; INCIDENT_COUNT: number }) => {
          incidentDeaths.push(participant.INCIDENT_COUNT);
          relationshipLabels.push(participant.RELATIONSHIP);
        }
      );

      this.setState({
        ...this.state,
        isLoading: false,
        data: {
          labels: relationshipLabels,
          datasets: [
            {
              label: 'Number of incidents',
              backgroundColor: orange,
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

export default AtRiskRelationships;
