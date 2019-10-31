import React from 'react';
import IncidentForm from '../IncidentForm';
import GunForm from '../GunForm';
import LocationForm from '../LocationForm';
import { Button, Icon, Spin } from 'antd';
import CrimeCard from '../CrimeCard/CrimeCard';
import { SelectValue } from 'antd/lib/select';

// TODO: add the date range
interface SearchToolState {
  characteristics: string[];
  gunTypes: string[];
  usState: string;
  cityOrCounty: string;
  houseDistrict: string;
  senateDistrict: string;
  waitingForData: boolean;
}

const initialState: SearchToolState = {
  characteristics: [],
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
    this.setState({ ...this.state, waitingForData: true });

    // TODO: pass in state as arguments
    const response = await fetch('/api/incidents/firstFour');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    // TODO: do stuff with the data returned
    console.log(body);

    // Spinning indicator stops
    this.setState({ ...this.state, waitingForData: false });
  };

  public render() {
    return (
      <div>
        <IncidentForm onCharacteristicChange={this.onCharacteristicChange} />
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
        {/* TODO: this was only here as a placeholder, replace with results pane */}
        <CrimeCard title="06/18/2016" />
      </div>
    );
  }
}

export default SearchTool;
