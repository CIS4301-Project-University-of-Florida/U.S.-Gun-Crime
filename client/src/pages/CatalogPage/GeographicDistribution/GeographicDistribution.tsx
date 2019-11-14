import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
import {
  RangePickerValue,
  RangePickerPresetRange,
} from 'antd/lib/date-picker/interface';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import { Spin, Icon } from 'antd';

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

const presetRanges: { [range: string]: RangePickerPresetRange } = {
  '2013': [moment('01/01/2013'), moment('12/31/2013')],
  '2014': [moment('01/01/2014'), moment('12/31/2014')],
  '2015': [moment('01/01/2015'), moment('12/31/2015')],
  '2016': [moment('01/01/2016'), moment('12/31/2016')],
  '2017': [moment('01/01/2017'), moment('12/31/2017')],
  '2018': [moment('01/01/2018'), moment('03/31/2018')],
};

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

    this.fetchLocationsFor(this.state.dateRange);
  }

  private fetchLocationsFor = async (dateRange: [string, string]) => {
    this.setState({
      ...this.state,
      dateRange,
      waitingForData: true,
    });

    try {
      const locations = await axios.post(`/api/location/coordinates`, {
        start: dateRange[0],
        end: dateRange[1],
      });

      this.setState({
        ...this.state,
        waitingForData: false,
        locations: locations.data,
      });
    } catch (error) {}
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
        <p>
          Disclaimer: Some data is missing from the years 2013 and 2018. See{' '}
          <Link to={PageEnum.ABOUT.url}>the about page</Link> for more info.
        </p>
        <section style={{ display: 'flex', marginTop: '2.5rem' }}>
          <h4>Select a date range to explore:</h4>
          <DateRangePicker
            disabled={this.state.waitingForData}
            onChange={this.onYearChange}
            ranges={presetRanges}
            value={[
              moment(this.state.dateRange[0]),
              moment(this.state.dateRange[1]),
            ]}
            allowClear={false}
            style={{ marginLeft: '10px' }}
          />
        </section>
        <div style={{ position: 'relative' }}>
          {this.state.waitingForData ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: '10',
                backgroundColor: 'silver',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: '0.8',
              }}
            >
              <Spin
                indicator={
                  <Icon type="loading" style={{ fontSize: 50 }} spin={true} />
                }
              />
            </div>
          ) : null}

          <ComposableMap
            projectionConfig={{ scale: 1000 }}
            width={980}
            height={551}
            style={{
              marginTop: '2.5rem',
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
                })}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </Page>
    );
  }
}

export default GeographicDistribution;
