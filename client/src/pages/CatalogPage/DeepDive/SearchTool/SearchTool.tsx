import React, { ChangeEvent } from 'react';
import IncidentForm from '../IncidentForm';
import GunForm from '../GunForm';
import LocationForm from '../LocationForm';
import { Button, Icon, Spin } from 'antd';
import CrimeCard from '../CrimeCard/CrimeCard';
import { SelectValue } from 'antd/lib/select';
import axios from 'axios';
import { equalityDefault } from 'components/EqualityInput/EqualityInput';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

// TODO: add participants
export interface SearchToolState {
  characteristics: string[];
  numKilled: { equality: string; count: number };
  numInjured: { equality: string; count: number };
  dateRange: [string, string];
  gunTypes: string[];
  usState: string;
  cityOrCounty: string;
  houseDistrict: string;
  senateDistrict: string;
  waitingForData: boolean;
}

const initialState: SearchToolState = {
  characteristics: [],
  numKilled: { equality: equalityDefault, count: 0 },
  numInjured: { equality: equalityDefault, count: 0 },
  dateRange: ['', ''],
  gunTypes: [],
  usState: '',
  cityOrCounty: '',
  houseDistrict: '',
  senateDistrict: '',
  waitingForData: false,
};

class SearchTool extends React.Component<{}, SearchToolState> {
  public constructor({}) {
    super({});
    this.state = initialState;
  }

  public onCharacteristicChange = (characteristics: string[]) => {
    this.setState({
      ...this.state,
      characteristics,
    });
  };

  public onKilledEqualityChange = (value: string) => {
    this.setState({
      ...this.state,
      numKilled: { equality: value, count: this.state.numKilled.count },
    });
  };

  public onKillCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      numKilled: {
        equality: this.state.numKilled.equality,
        count: Number(event.target.value),
      },
    });
  };

  public onInjuredEqualityChange = (value: string) => {
    this.setState({
      ...this.state,
      numInjured: { equality: value, count: this.state.numInjured.count },
    });
  };

  public onInjuredCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      numInjured: {
        equality: this.state.numInjured.equality,
        count: Number(event.target.value),
      },
    });
  };

  public onDateRangeChange = (
    dates: RangePickerValue,
    dateStrings: [string, string]
  ) => {
    this.setState(
      {
        ...this.state,
        dateRange: dateStrings,
      },
      () => console.log(this.state)
    );
  };

  public onGunTypeChange = (gunTypes: string[]) => {
    this.setState({
      ...this.state,
      gunTypes,
    });
  };

  public onUSStateChange = (usState: SelectValue | undefined) => {
    this.setState({
      ...this.state,
      usState: usState ? usState.toString() : '',
    });
  };

  public onCityOrCountyChange = (cityOrCounty: SelectValue | undefined) => {
    this.setState({
      ...this.state,
      cityOrCounty: cityOrCounty ? cityOrCounty.toString() : '',
    });
  };

  public onHouseDistrictChange = (houseDistrict: SelectValue | undefined) => {
    this.setState({
      ...this.state,
      houseDistrict: houseDistrict ? houseDistrict.toString() : '',
    });
  };

  public onSenateDistrictChange = (senateDistrict: SelectValue | undefined) => {
    this.setState({
      ...this.state,
      senateDistrict: senateDistrict ? senateDistrict.toString() : '',
    });
  };

  public requestGunCrimesFromAPI = async () => {
    // Fire up the spinning indicator
    this.setState({ ...this.state, waitingForData: true }, () =>
      console.log(this.state)
    );

    try {
      const response = await axios.post('/api/deepdive', this.state);
      console.log(response.data);
    } catch (error) {
      // TODO: give user some indication that it failed
    }

    // Spinning indicator stops
    this.setState({ ...this.state, waitingForData: false });
  };

  public render() {
    return (
      <div>
        <section>
          <IncidentForm
            onCharacteristicChange={this.onCharacteristicChange}
            onKilledEqualityChange={this.onKilledEqualityChange}
            onKillCountChange={this.onKillCountChange}
            onInjuredEqualityChange={this.onInjuredEqualityChange}
            onInjuredCountChange={this.onInjuredCountChange}
            onDateRangeChange={this.onDateRangeChange}
          />
          <GunForm onGunTypeChange={this.onGunTypeChange} />
          <LocationForm
            onUSStateChange={this.onUSStateChange}
            onCityOrCountyChange={this.onCityOrCountyChange}
            onHouseDistrictChange={this.onHouseDistrictChange}
            onSenateDistrictChange={this.onSenateDistrictChange}
          />
          <Button type="primary" onClick={this.requestGunCrimesFromAPI}>
            Search database
          </Button>
          <Spin
            spinning={this.state.waitingForData}
            indicator={<Icon type="loading" />}
            style={{ marginLeft: '5px' }}
          />
        </section>
        {/* TODO: results here */}
        <section />
        <div />

        {/* TODO: this was only here as a placeholder, replace with results pane */}
        <CrimeCard title="06/18/2016" />
      </div>
    );
  }
}

export default SearchTool;
