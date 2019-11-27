import React from 'react';
import axios from 'axios';
import { Line, Polar, Bar, HorizontalBar } from 'react-chartjs-2';
import { Card } from 'antd';

// tslint:disable-next-line: no-empty-interface
interface BarGraphProps {
  graphSettings: string;
}

interface DataSetObj {
  label: string;
  backgroundColor: string;
  data: number[];
}

interface DataObj {
  labels: string[];
  datasets: DataSetObj[];
}

interface BarGraphState {
  waitingForBarGraphData: boolean;
  someLabels: string[];
  BarGraphData: number[];
  data: DataObj;
}

class BarGraph extends React.Component<BarGraphProps, BarGraphState> {
  public constructor(props: BarGraphProps) {
    super(props);
    this.state = {
      waitingForBarGraphData: true,
      someLabels: [],
      BarGraphData: [],
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
    this.fetchBarGraphData();
  }

  private fetchBarGraphData = async () => {
    try {
      const response = await axios.get(
        '/api/bargraphs/' + this.props.graphSettings
      );

      const BarGraphData: number[] = [];
      const someLabels: string[] = [];

      if (this.props.graphSettings === 'byguntype') {
        response.data.forEach((p: { N_KILLED: number }) =>
          BarGraphData.push(p.N_KILLED)
        );
        response.data.forEach((p: { TYPE: string }) => someLabels.push(p.TYPE));
      } else if (this.props.graphSettings === 'mostlethalincidents') {
        response.data.forEach((p: { N_KILLED: number }) =>
          BarGraphData.push(p.N_KILLED)
        );
        response.data.forEach((p: { INCIDENT_DETAILS: string }) =>
          someLabels.push(p.INCIDENT_DETAILS)
        );
      } else if (this.props.graphSettings === 'mostdangerousstates') {
        response.data.forEach((p: { N_KILLED: number }) =>
          BarGraphData.push(p.N_KILLED)
        );
        response.data.forEach((p: { STATE: string }) =>
          someLabels.push(p.STATE)
        );
      } else {
        response.data.forEach((p: { INCIDENTCOUNT: number }) =>
          BarGraphData.push(p.INCIDENTCOUNT)
        );
        response.data.forEach((p: { RELATIONSHIP: string }) =>
          someLabels.push(p.RELATIONSHIP)
        );
      }

      if (this.props.graphSettings === 'mostlethalincidents') {
        this.setState({
          ...this.state,
          waitingForBarGraphData: false,
          BarGraphData,
          data: {
            labels: someLabels,
            datasets: [
              {
                label: 'Number of people killed in each incident',
                backgroundColor: 'rgba(80, 17, 68, 1)',
                data: BarGraphData,
              },
            ],
          },
        });
      } else if (this.props.graphSettings === 'mostdangerousstates') {
        this.setState({
          ...this.state,
          waitingForBarGraphData: false,
          BarGraphData,
          data: {
            labels: someLabels,
            datasets: [
              {
                label: 'Number of people killed in each state',
                backgroundColor: 'rgba(80, 17, 68, 1)',
                data: BarGraphData,
              },
            ],
          },
        });
      } else if (this.props.graphSettings === 'byguntype') {
        this.setState({
          ...this.state,
          waitingForBarGraphData: false,
          BarGraphData,
          data: {
            labels: someLabels,
            datasets: [
              {
                label: 'Gun deaths caused by each gun type',
                backgroundColor: 'rgba(80, 17, 68, 1)',
                data: BarGraphData,
              },
            ],
          },
        });
      } else {
        this.setState({
          ...this.state,
          waitingForBarGraphData: false,
          BarGraphData,
          data: {
            labels: someLabels,
            datasets: [
              {
                label: 'Number of gun incidents',
                backgroundColor: 'rgba(80, 17, 68, 1)',
                data: BarGraphData,
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
    return (
      <Card>
        <div style={{ height: 1000 }}>
          <HorizontalBar
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
            data={this.state.data}
          />
        </div>
      </Card>
    );
  }
}

export default BarGraph;