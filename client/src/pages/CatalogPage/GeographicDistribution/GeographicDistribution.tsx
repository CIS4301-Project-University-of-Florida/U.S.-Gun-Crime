import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import GoogleMapReact from 'google-map-react';
import MapIcon from './MapIcon';
import { Slider } from 'antd';
import axios from 'axios';
import { SliderValue } from 'antd/lib/slider';

interface Coordinate {
  LATITUDE: number;
  LONGITUDE: number;
}

interface GeographicDistributionState {
  waitingForData: boolean;
  locations: Coordinate[];
}

class GeographicDistribution extends React.Component<
  {},
  GeographicDistributionState
> {
  private mapCenter = { lat: 39, lng: -98 };

  private sliderMarks = {
    2013: '2013',
    2014: '2014',
    2015: '2015',
    2016: '2016',
    2017: '2017',
    2018: '2018',
  };

  public constructor(props: {}) {
    super(props);
    this.state = { waitingForData: true, locations: [] };
    this.fetchLocationsFor(this.sliderMarks[2013]);
  }

  private fetchLocationsFor = async (year: string) => {
    this.setState({ waitingForData: true });

    try {
      const locations = await axios.get(`/api/location/coordinates/${year}`);

      this.setState({
        waitingForData: false,
        locations: locations.data,
      });
    } catch (error) {}
  };

  private onYearChange = (value: SliderValue) => {
    this.fetchLocationsFor(value.toString());
  };

  public render() {
    return (
      <Page title={PageEnum.GEOGRAPHIC_DISTRIBUTION.title}>
        <Slider
          dots={true}
          defaultValue={2013}
          min={2013}
          max={2018}
          step={1}
          marks={this.sliderMarks}
          onAfterChange={this.onYearChange}
          disabled={this.state.waitingForData}
        />
        <div style={{ width: '100%', height: '500px', marginTop: '50px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
            defaultCenter={this.mapCenter}
            defaultZoom={4.5}
          >
            {this.state.locations.map((loc: Coordinate) => {
              return (
                <MapIcon
                  key={`${loc.LATITUDE}${loc.LONGITUDE}`}
                  lat={loc.LATITUDE}
                  lng={loc.LONGITUDE}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </Page>
    );
  }
}

export default GeographicDistribution;
