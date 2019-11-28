import React from 'react';
import axios from 'axios';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Card, Spin } from 'antd';
import { orange, fadedRed, darkPink } from '../chartColors';

interface PieGraphProps {
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

interface PieGraphState {
  isLoading: boolean;
  PieGraphData: number[];
  data: DataObj;
}

class PieGraph extends React.Component<PieGraphProps, PieGraphState> {
  public constructor(props: PieGraphProps) {
    super(props);
    this.state = {
      isLoading: true,
      PieGraphData: [],
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
  }

  public componentDidMount() {
    this.fetchData();
  }

  private fetchData = async () => {
    try {
      const response = await axios.get(
        '/api/piegraphs/' + this.props.graphSettings
      );

      const PieGraphData: number[] = [];

      if (this.props.graphSettings === 'bygender') {
        response.data.forEach((p: { N_KILLED: number }) =>
          PieGraphData.push(p.N_KILLED)
        );
      } else {
        response.data.forEach((p: { NUMINCIDENTS: number }) =>
          PieGraphData.push(p.NUMINCIDENTS)
        );
      }

      if (this.props.graphSettings === 'bygender') {
        this.setState({
          ...this.state,
          isLoading: false,
          PieGraphData,
          data: {
            labels: ['Male', 'Female', 'Unknown'],
            datasets: [
              {
                backgroundColor: [darkPink, fadedRed, orange],
                data: PieGraphData,
              },
            ],
          },
        });
      } else {
        this.setState({
          ...this.state,
          isLoading: false,
          PieGraphData,
          data: {
            labels: ['Stolen Guns', 'Unknown', 'Legal Guns'],
            datasets: [
              {
                backgroundColor: [fadedRed, darkPink, orange],
                data: PieGraphData,
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
        <div>
          {!this.state.isLoading ? (
            <Doughnut
              options={{
                responsive: true,
                title: {
                  display: true,
                  text: 'Number of Crimes Committed by Gender',
                },
              }}
              data={this.state.data}
            />
          ) : (
            <Spin tip="Loading...">
              <Doughnut
                options={{
                  responsive: true,
                }}
                data={this.state.data}
              />
            </Spin>
          )}
        </div>
      );
    } else {
      return (
        <div>
          {!this.state.isLoading ? (
            <Pie
              options={{
                responsive: true,
              }}
              data={this.state.data}
            />
          ) : (
            <Spin tip="Loading...">
              <Pie
                options={{
                  responsive: true,
                }}
                data={this.state.data}
              />
            </Spin>
          )}
        </div>
      );
    }
  }
}

export default PieGraph;
