import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Spin } from 'antd';
import {
  darkPink,
  fadedRed,
  orange,
  darkerPurple,
  darkPurple,
} from '../chartColors';

interface ParticipantAgeDistributionProps {
  type: 'victim' | 'subject-suspect';
}

interface DataObject {
  labels: string[];
  datasets: [{ label: string; backgroundColor: string[]; data: number[] }];
}

interface ParticipantAgeDistributionState {
  isLoading: boolean;
  participantAgeDistributionData: number[];
  data: DataObject;
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
        ...this.state,
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
        {!this.state.isLoading ? (
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
        ) : (
          <Spin tip="Loading...">
            <div style={{ height: 300 }}>
              <Bar
                options={{
                  legend: {
                    display: false,
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                data={this.state.data}
              />
            </div>
          </Spin>
        )}
      </div>
    );
  }
}

export default ParticipantAgeDistribution;
