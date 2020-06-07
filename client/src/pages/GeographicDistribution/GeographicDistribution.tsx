import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import axios from 'axios';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';
import moment from 'moment';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import LoadingOverlay from 'components/LoadingOverlay/LoadingOverlay';
import { orange } from '../DataVisualizations/chartColors';

interface Coordinate {
  LATITUDE: number;
  LONGITUDE: number;
}

interface GeographicDistributionState {
  waitingForData: boolean;
  dateRange: [string, string];
  locations: Coordinate[];
}

const defaultDateRange: [string, string] = ['01/01/2013', '12/31/2013'];

class GeographicDistribution extends React.Component<
  {},
  GeographicDistributionState
> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      dateRange: defaultDateRange,
      waitingForData: true,
      locations: [],
    };
  }

  public componentDidMount() {
    this.fetchLocationsFor(this.state.dateRange);
  }

  private fetchLocationsFor = async (dateRange: [string, string]) => {
    this.setState({
      dateRange,
      waitingForData: true,
    });

    try {
      const locations = await axios.post(`/api/location/coordinates`, {
        start: dateRange[0],
        end: dateRange[1],
      });

      this.setState({
        waitingForData: false,
        locations: locations.data,
      });
    } catch (error) {
      console.log(
        `GeographicDistribution's fetchLocationsFor(${dateRange}): ${error}`
      );
    }
  };

  private onYearChange = (
    dates: RangePickerValue,
    dateStrings: [string, string]
  ) => {
    this.fetchLocationsFor(dateStrings);
  };

  public render() {
    return (
      <Page title={PageEnum.GEOGRAPHIC_DISTRIBUTION.title}>
        <p>Disclaimer: Some data is missing from the years 2013 and 2018.</p>
        <section
          style={{
            display: 'flex',
            marginTop: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <h4>Select a date range to explore:</h4>
          <DateRangePicker
            disabled={this.state.waitingForData}
            onChange={this.onYearChange}
            value={[
              moment(this.state.dateRange[0]),
              moment(this.state.dateRange[1]),
            ]}
            allowClear={false}
            style={{ marginLeft: '10px' }}
          />
        </section>

        <LoadingOverlay loading={this.state.waitingForData}>
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
                {this.state.locations.map((loc: Coordinate) => {
                  return (
                    <Marker
                      key={`${loc.LONGITUDE}${loc.LATITUDE}`}
                      marker={{ coordinates: [loc.LONGITUDE, loc.LATITUDE] }}
                      style={{
                        default: { fill: orange },
                      }}
                    >
                      <circle
                        cx={0}
                        cy={0}
                        r={2}
                        style={{
                          stroke: orange,
                          strokeWidth: 2,
                          opacity: 0.9,
                        }}
                      />
                    </Marker>
                  );
                })}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </LoadingOverlay>
      </Page>
    );
  }
}

export default GeographicDistribution;
