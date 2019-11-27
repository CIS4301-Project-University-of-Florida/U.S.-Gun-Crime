import React from 'react';
import axios from 'axios';
import { Bar, Polar, Pie, Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';

// tslint:disable-next-line: no-empty-interface
interface PolarGraphProps {
  graphSettings: string;
}

interface DataSetObj {
  backgroundColor: string[];
  data: number[];
}

interface DataObj {
  labels: string[];
  datasets: DataSetObj[];
}

interface PolarGraphState {
  waitingForPolarGraphData: boolean;
  PolarGraphData: number[];
  data: DataObj;
}

class PolarGraph extends React.Component<PolarGraphProps, PolarGraphState> {
  public constructor(props: PolarGraphProps) {
    super(props);
    this.state = {
      waitingForPolarGraphData: true,
      PolarGraphData: [],
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
    };
    this.fetchParticipantRelationshipData();
  }

  private fetchParticipantRelationshipData = async () => {
    try {
      const response = await axios.get(
        '/api/polargraphs/' + this.props.graphSettings
      );

      const PolarGraphData: number[] = [];

      if (this.props.graphSettings === 'bygender') {
        response.data.forEach((p: { N_KILLED: number }) =>
          PolarGraphData.push(p.N_KILLED)
        );
      } else {
        response.data.forEach((p: { NUMINCIDENTS: number }) =>
          PolarGraphData.push(p.NUMINCIDENTS)
        );
      }

      if (this.props.graphSettings === 'bygender') {
        this.setState({
          ...this.state,
          waitingForPolarGraphData: false,
          PolarGraphData,
          data: {
            labels: ['Male', 'Female', 'Unknown'],
            datasets: [
              {
                backgroundColor: [
                  'rgba(112, 31, 71, 1)',
                  'rgba(172, 74, 78, 1)',
                  'rgba(238, 146, 64, 1)',
                ],
                data: PolarGraphData,
              },
            ],
          },
        });
      } else {
        this.setState({
          ...this.state,
          waitingForPolarGraphData: false,
          PolarGraphData,
          data: {
            labels: ['Stolen Guns', 'Unknown', 'Legal Guns'],
            datasets: [
              {
                backgroundColor: [
                  'rgba(238, 146, 64, 1)',

                  'rgba(172, 74, 78, 1)',
                  'rgba(112, 31, 71, 1)',
                ],
                data: PolarGraphData,
              },
            ],
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    if (this.props.graphSettings === 'bygender') {
      return (
        <Card title="Gun Deaths Caused By Gender">
          <Doughnut
            options={{
              responsive: true,
            }}
            data={this.state.data}
          />
        </Card>
      );
    } else {
      return (
        <Card title="Incidents Caused By Stolen vs. Legal Guns">
          <Pie
            options={{
              responsive: true,
            }}
            data={this.state.data}
          />
        </Card>
      );
    }
  }
}

export default PolarGraph;
