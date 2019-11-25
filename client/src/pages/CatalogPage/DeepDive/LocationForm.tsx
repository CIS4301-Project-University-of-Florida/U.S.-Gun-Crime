import React from 'react';
import DataForm from 'components/Forms/DataForm/DataForm';
import SelectSearch from 'components/Forms/SelectSearch/SelectSearch';
import { SelectValue } from 'antd/lib/select';
import FormField from 'components/Forms/FormField/FormField';
import axios from 'axios';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';

interface LocationFormProps {
  onUSStateChange: (value: SelectValue | undefined) => void;
  onCityOrCountyChange: (value: SelectValue | undefined) => void;
  onHouseDistrictChange: (value: SelectValue | undefined) => void;
  onSenateDistrictChange: (value: SelectValue | undefined) => void;
}

interface LocationFormState {
  waitingForStateData: boolean;
  states: string[];
  waitingForCityCountyData: boolean;
  citiesAndCounties: string[];
  waitingForHouseDistrictData: boolean;
  houseDistricts: string[];
  waitingForSenateDistrictData: boolean;
  senateDistricts: string[];
}

class LocationForm extends React.Component<
  LocationFormProps,
  LocationFormState
> {
  public constructor(props: LocationFormProps) {
    super(props);
    this.state = {
      waitingForStateData: true,
      states: [],
      waitingForCityCountyData: true,
      citiesAndCounties: [],
      waitingForHouseDistrictData: true,
      houseDistricts: [],
      waitingForSenateDistrictData: true,
      senateDistricts: [],
    };
  }

  public componentDidMount() {
    this.fetchStateData();
    this.fetchCityAndCountyData();
    this.fetchHouseDistrictData();
    this.fetchSenateDistrictData();
  }

  private fetchStateData = async () => {
    try {
      const response = await axios.get('/api/location/states');

      const states: string[] = [];
      response.data.forEach((s: { STATE: string }) => states.push(s.STATE));

      this.setState({
        ...this.state,
        waitingForStateData: false,
        states,
      });
    } catch (error) {}
  };

  private fetchCityAndCountyData = async (state?: string) => {
    try {
      const response = await axios.get(
        `/api/location/${state ? `${state}/` : ''}citiesAndCounties`
      );

      const citiesAndCounties: string[] = [];
      response.data.forEach((c: { CITY_OR_COUNTY: string }) =>
        citiesAndCounties.push(c.CITY_OR_COUNTY)
      );

      this.setState({
        ...this.state,
        waitingForCityCountyData: false,
        citiesAndCounties,
      });
    } catch (error) {}
  };

  private fetchHouseDistrictData = async (state?: string) => {
    try {
      const response = await axios.get(
        `/api/location/${state ? `${state}/` : ''}houseDistricts`
      );

      const houseDistricts: string[] = [];
      response.data.forEach((h: { STATE_HOUSE_DISTRICT: string }) =>
        houseDistricts.push(h.STATE_HOUSE_DISTRICT)
      );

      this.setState({
        ...this.state,
        waitingForHouseDistrictData: false,
        houseDistricts,
      });
    } catch (error) {}
  };

  private fetchSenateDistrictData = async (state?: string) => {
    try {
      const response = await axios.get(
        `/api/location/${state ? `${state}/` : ''}senateDistricts`
      );

      const senateDistricts: string[] = [];
      response.data.forEach((s: { STATE_SENATE_DISTRICT: string }) =>
        senateDistricts.push(s.STATE_SENATE_DISTRICT)
      );

      this.setState({
        ...this.state,
        waitingForSenateDistrictData: false,
        senateDistricts,
      });
    } catch (error) {}
  };

  /**
   * Called when the user selects a state. Passes the call up to
   * the parent component where the form data is maintained. In
   * addition, it re-fetches city data for this specific state.
   */
  private onUSStateChange = (state: SelectValue | undefined) => {
    // See SearchTool.tsx
    this.props.onUSStateChange(state);

    // We'll refetch all this data to help users so they don't
    // select the wrong information for a state
    this.setState({
      ...this.state,
      waitingForCityCountyData: true,
      waitingForHouseDistrictData: true,
      waitingForSenateDistrictData: true,
      citiesAndCounties: [],
      houseDistricts: [],
      senateDistricts: [],
    });

    // If the user selected a state, re-fetch city/house/senate data
    // for this particular state
    if (state) {
      const s = state.toString();
      this.fetchCityAndCountyData(s);
      this.fetchHouseDistrictData(s);
      this.fetchSenateDistrictData(s);
    } else {
      // Reset the dropdowns to all available data if no state
      // (which happens when the user) de-selects a state
      this.fetchCityAndCountyData();
      this.fetchHouseDistrictData();
      this.fetchSenateDistrictData();
    }
  };

  public render() {
    return (
      <DataForm>
        <h2>Location</h2>

        <FormField label="State">
          <SelectSearch
            style={{ minWidth: '200px' }}
            data={this.state.states}
            disabled={this.state.waitingForStateData}
            placeholder={
              this.state.waitingForStateData ? (
                <LoadingSpin />
              ) : (
                'Select a state...'
              )
            }
            onChange={this.onUSStateChange}
          />
        </FormField>

        {/* TODO: implement windowing to reduce lag */}
        <FormField label="City/county">
          <SelectSearch
            style={{ minWidth: '300px' }}
            data={this.state.citiesAndCounties}
            disabled={this.state.waitingForCityCountyData}
            placeholder={
              this.state.waitingForCityCountyData ? (
                <LoadingSpin />
              ) : (
                'Select a city or county...'
              )
            }
            onChange={this.props.onCityOrCountyChange}
          />
        </FormField>

        <FormField label="House district">
          <SelectSearch
            style={{ minWidth: '180px' }}
            data={this.state.houseDistricts}
            disabled={this.state.waitingForHouseDistrictData}
            placeholder={
              this.state.waitingForHouseDistrictData ? (
                <LoadingSpin />
              ) : (
                '(State level)'
              )
            }
            onChange={this.props.onHouseDistrictChange}
          />
        </FormField>

        <FormField label="Senate district">
          <SelectSearch
            style={{ minWidth: '180px' }}
            data={this.state.senateDistricts}
            disabled={this.state.waitingForSenateDistrictData}
            placeholder={
              this.state.waitingForSenateDistrictData ? (
                <LoadingSpin />
              ) : (
                '(State level)'
              )
            }
            onChange={this.props.onSenateDistrictChange}
          />
        </FormField>
      </DataForm>
    );
  }
}

export default LocationForm;
