import React from 'react';
import axios from 'axios';
import { Bar, ChartData } from 'react-chartjs-2';
import {
  darkPink,
  fadedRed,
  orange,
  darkerPurple,
  darkPurple,
} from '../chartColors';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import * as chartjs from 'chart.js';

interface ParticipantAgeDistributionProps {
  type: 'victim' | 'subject-suspect';
}

interface ParticipantAgeDistributionState {
  isLoading: boolean;
  participantAgeDistributionData: number[];
  data: ChartData<chartjs.ChartData>;
}

class ParticipantAgeDistribution extends React.Component<
  ParticipantAgeDistributionProps,
  ParticipantAgeDistributionState
> {
  public constructor(props: ParticipantAgeDistributionProps) {
    super(props);
    this.state = {
      isLoading: true,
      participantAgeDistributionData: [],
      data: {
        labels: [],
        datasets: [
          {
            label: '',
            backgroundColor: [],
            data: [],
          },
        ],
      },
    };
  }

  public componentDidMount() {
    this.fetchParticipantAgeDistributionData();
  }

  private fetchParticipantAgeDistributionData = async () => {
    try {
      const response = await axios.get(
        `/api/participant/ageDistribution/${this.props.type}`
      );

      const participantAgeDistributionData: number[] = [];

      console.log(response.data);

      response.data.forEach(
        (p: {
          GROUP1: number;
          GROUP2: number;
          GROUP3: number;
          GROUP4: number;
          GROUP5: number;
        }) =>
          participantAgeDistributionData.push(
            p.GROUP1,
            p.GROUP2,
            p.GROUP3,
            p.GROUP4,
            p.GROUP5
          )
      );

      this.setState({
        isLoading: false,
        participantAgeDistributionData,
        data: {
          labels: [
            'Ages 0–9',
            'Ages 10–18',
            'Ages 19–25',
            'Ages 26–64',
            'Ages 65+',
          ],
          datasets: [
            {
              label: this.props.type + ' ',
              backgroundColor: [
                darkerPurple,
                darkPurple,
                darkPink,
                fadedRed,
                orange,
              ],
              data: participantAgeDistributionData,
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
          <div style={{ height: 300 }}>
            <Bar
              options={{
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: `Age Ranges of ${
                    this.props.type === 'victim' ? 'Victims' : 'Suspects'
                  }`,
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
              data={this.state.data}
            />
          </div>
        </LoadingSpin>
      </div>
    );
  }
}

export default ParticipantAgeDistribution;
