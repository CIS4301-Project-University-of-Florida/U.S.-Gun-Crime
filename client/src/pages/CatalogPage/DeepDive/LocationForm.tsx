import React from 'react';
import DataForm from './DataForm/DataForm';
import SelectSearch from 'components/Forms/SelectSearch/SelectSearch';
import { SelectValue } from 'antd/lib/select';
import FormField from 'components/Forms/FormField/FormField';
import axios from 'axios';
import { Spin } from 'antd';
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

  private fetchCityAndCountyData = async () => {
    try {
      const response = await axios.get('/api/location/citiesAndCounties');

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

  private fetchHouseDistrictData = async () => {
    try {
      const response = await axios.get('/api/location/houseDistricts');

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

  private fetchSenateDistrictData = async () => {
    try {
      const response = await axios.get('/api/location/senateDistricts');

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

  public render() {
    return (
      <DataForm>
        <h2>Location</h2>

        <FormField label="State">
          <SelectSearch
            data={this.state.states}
            disabled={this.state.waitingForStateData}
            placeholder={
              this.state.waitingForStateData ? (
                <LoadingSpin />
              ) : (
                'Select a state...'
              )
            }
            onChange={this.props.onUSStateChange}
          />
        </FormField>

        {/* TODO: implement windowing to reduce lag */}
        <FormField label="City">
          <SelectSearch
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
