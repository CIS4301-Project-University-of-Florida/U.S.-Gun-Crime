import React from 'react';
import axios from 'axios';
import { Bar, Polar } from 'react-chartjs-2';
import { Card } from 'antd';

// tslint:disable-next-line: no-empty-interface
interface PolarGraphProps {
  graphSettings: string;
}

interface DataSetObj {
  label: string;
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
            label: '',
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

      this.setState({
        ...this.state,
        waitingForPolarGraphData: false,
        PolarGraphData,
        data: {
          labels: ['Male', 'Female'],
          datasets: [
            {
              label: 'gun deaths caused by gender',
              backgroundColor: [
                'rgba(40,116,166, 0.8)',
                'rgba(46,182,193, 0.8)',
              ],
              data: PolarGraphData,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    if (this.props.graphSettings === 'bygender') {
      return (
        <Card title="Gun Deaths Caused By Gender">
          <Polar
            options={{
              responsive: true,
            }}
            data={this.state.data}
          />
        </Card>
      );
    } else {
      return (
        <Card title="Incident counts for Stolen vs. Legal Guns">
          <Polar
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
