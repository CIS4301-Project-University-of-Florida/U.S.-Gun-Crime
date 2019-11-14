import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import { Slider } from 'antd';
import axios from 'axios';
import { SliderValue } from 'antd/lib/slider';
import { Link } from 'react-router-dom';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';

interface Coordinate {
  LATITUDE: number;
  LONGITUDE: number;
}

interface GeographicDistributionState {
  waitingForData: boolean;
  currentYear: string;
  locations: { [key: string]: Coordinate[] };
}

class GeographicDistribution extends React.Component<
  {},
  GeographicDistributionState
> {
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
    this.state = {
      currentYear: '2013',
      waitingForData: true,
      locations: { 2013: [], 2014: [], 2015: [], 2016: [], 2017: [], 2018: [] },
    };

    console.log(this.state.locations[this.state.currentYear]);

    this.fetchLocationsFor('2013');
  }

  private fetchLocationsFor = async (year: string) => {
    this.setState({ ...this.state, waitingForData: true });

    try {
      const locations = await axios.get(`/api/location/coordinates/${year}`);

      this.setState({
        ...this.state,
        waitingForData: false,
        currentYear: year,
        locations: { ...this.state.locations, [year]: locations.data },
      });
    } catch (error) {}
  };

  private onYearChange = (value: SliderValue) => {
    const year = value.toString();

    // If we already have data for that year, simply change the current year
    // but don't refetch the data from the DB
    if (this.state.locations[year].length) {
      this.setState({ ...this.state, currentYear: year });
      return;
    }

    this.fetchLocationsFor(year);
  };

  public render() {
    return (
      <Page title={PageEnum.GEOGRAPHIC_DISTRIBUTION.title}>
        <p>
          Disclaimer: Some data is missing from the years 2013 and 2018. See{' '}
          <Link to={PageEnum.ABOUT.url}>the about page</Link> for more info.
        </p>
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
        <ComposableMap
          projectionConfig={{ scale: 1000 }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <ZoomableGroup center={[-97, 40]} disablePanning={false}>
            <Geographies geography="/usa_map.json">
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: '#ECEFF1',
                        stroke: '#607D8B',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>
            <Markers>
              {this.state.locations[this.state.currentYear].map(
                (loc: Coordinate) => {
                  return (
                    <Marker
                      key={`${loc.LONGITUDE}${loc.LATITUDE}`}
                      marker={{ coordinates: [loc.LONGITUDE, loc.LATITUDE] }}
                      style={{
                        default: { fill: '#FF5722' },
                      }}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={2}
                        style={{
                          stroke: '#FF5722',
                          strokeWidth: 2,
                          opacity: 0.9,
                        }}
                      />
                    </Marker>
                  );
                }
              )}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </Page>
    );
  }
}

export default GeographicDistribution;
