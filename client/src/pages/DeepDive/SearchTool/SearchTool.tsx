import React from 'react';
import IncidentForm from '../IncidentForm';
import GunForm from '../GunForm';
import LocationForm from '../LocationForm';
import { Button, Icon, Spin } from 'antd';
import { SelectValue } from 'antd/lib/select';
import axios from 'axios';
import { equalityDefault } from 'components/Forms/EqualityInput/EqualityInput';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import ParticipantForm from '../ParticipantForm/ParticipantForm';
import Participant from 'pages/DeepDive/ParticipantForm/Participant';
import { GunCrime } from 'pages/GunCrime';
import styles from './SearchTool.module.less';
import CrimeResults from '../CrimeResults/CrimeResults';

export interface SearchToolState {
  characteristics: string[];
  numKilled: { equality: string; count: number };
  numInjured: { equality: string; count: number };
  dateRange: [string, string];
  numGuns: { equality: string; count: number };
  gunTypes: string[];
  participant: Participant & { qualifier: string };
  usState: string;
  cityOrCounty: string;
  houseDistrict: string;
  senateDistrict: string;

  waitingForData: boolean;
  resultsAvailable: boolean;
  dataFetchFailed: boolean;
  gunCrimes: GunCrime[];
}

const initialState: SearchToolState = {
  characteristics: [],
  numKilled: { equality: equalityDefault, count: 0 },
  numInjured: { equality: equalityDefault, count: 0 },
  dateRange: ['', ''],
  numGuns: { equality: equalityDefault, count: 1 },
  gunTypes: [],
  participant: {
    qualifier: 'any',
    gender: '',
    age: { equality: equalityDefault, count: 0 },
    type: '',
    status: '',
    relationship: '',
  },
  usState: '',
  cityOrCounty: '',
  houseDistrict: '',
  senateDistrict: '',

  waitingForData: false,
  resultsAvailable: false,
  dataFetchFailed: false,
  gunCrimes: [],
};

class SearchTool extends React.Component<{}, SearchToolState> {
  public constructor(props: {}) {
    super(props);
    this.state = initialState;
  }

  public onCharacteristicChange = (characteristics: string[]) => {
    this.setState({
      characteristics,
    });
  };

  public onKilledEqualityChange = (value: string) => {
    this.setState({
      numKilled: { equality: value, count: this.state.numKilled.count },
    });
  };

  public onKillCountChange = (count: number) => {
    this.setState({
      numKilled: {
        equality: this.state.numKilled.equality,
        count,
      },
    });
  };

  public onInjuredEqualityChange = (value: string) => {
    this.setState({
      numInjured: { equality: value, count: this.state.numInjured.count },
    });
  };

  public onInjuredCountChange = (count: number) => {
    this.setState({
      numInjured: {
        equality: this.state.numInjured.equality,
        count,
      },
    });
  };

  public onDateRangeChange = (
    dates: RangePickerValue,
    dateStrings: [string, string]
  ) => {
    this.setState({
      dateRange: dateStrings,
    });
  };

  public onGunCountEqualityChange = (equality: string) => {
    this.setState({
      numGuns: { equality, count: this.state.numGuns.count },
    });
  };

  public onGunCountChange = (count: number) => {
    this.setState({
      numGuns: {
        equality: this.state.numGuns.equality,
        count,
      },
    });
  };

  public onGunTypeChange = (gunTypes: string[]) => {
    this.setState({
      gunTypes,
    });
  };

  public onParticipantQualifierChange = (qualifier: string) => {
    this.setState({
      participant: { ...this.state.participant, qualifier },
    });
  };

  public onParticipantGenderChange = (gender: string) => {
    this.setState({
      participant: { ...this.state.participant, gender },
    });
  };

  public onParticipantAgeEqualityChange = (equality: string) => {
    this.setState({
      participant: {
        ...this.state.participant,
        age: { ...this.state.participant.age, equality },
      },
    });
  };

  public onParticipantAgeValueChange = (age: number) => {
    this.setState({
      participant: {
        ...this.state.participant,
        age: { ...this.state.participant.age, count: age },
      },
    });
  };

  public onParticipantTypeChange = (type: string) => {
    this.setState({
      participant: { ...this.state.participant, type },
    });
  };

  public onParticipantStatusChange = (status: string) => {
    this.setState({
      participant: { ...this.state.participant, status },
    });
  };

  public onParticipantRelationshipChange = (relationship: string) => {
    this.setState({
      participant: { ...this.state.participant, relationship },
    });
  };

  public onUSStateChange = (usState: SelectValue | undefined) => {
    this.setState({
      usState: usState ? usState.toString() : '',
    });
  };

  public onCityOrCountyChange = (cityOrCounty: SelectValue | undefined) => {
    this.setState({
      cityOrCounty: cityOrCounty ? cityOrCounty.toString() : '',
    });
  };

  public onHouseDistrictChange = (houseDistrict: SelectValue | undefined) => {
    this.setState({
      houseDistrict: houseDistrict ? houseDistrict.toString() : '',
    });
  };

  public onSenateDistrictChange = (senateDistrict: SelectValue | undefined) => {
    this.setState({
      senateDistrict: senateDistrict ? senateDistrict.toString() : '',
    });
  };

  public fetchGunCrimes = async () => {
    // Fire up the spinning indicator
    this.setState({
      waitingForData: true,
      gunCrimes: [],
      resultsAvailable: false,
    });

    try {
      // Separate out the things we don't need for the payload using destructuring and spread
      const {
        waitingForData,
        resultsAvailable,
        dataFetchFailed,
        gunCrimes,
        ...payload
      } = this.state;

      // 120,000 ms = 2 minutes
      const response = await axios.post('/api/deepdive', payload, {
        timeout: 120000,
      });
      this.setState({
        gunCrimes: response.data,
        dataFetchFailed: false,
      });
    } catch (error) {
      this.setState({ dataFetchFailed: true });
    }

    // Spinning indicator stops
    this.setState({
      waitingForData: false,
      resultsAvailable: true,
    });
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
          <GunForm
            onGunCountEqualityChange={this.onGunCountEqualityChange}
            onGunCountChange={this.onGunCountChange}
            onGunTypeChange={this.onGunTypeChange}
          />
          <ParticipantForm
            onParticipantQualifierChange={this.onParticipantQualifierChange}
            onParticipantGenderChange={this.onParticipantGenderChange}
            onParticipantAgeEqualityChange={this.onParticipantAgeEqualityChange}
            onParticipantAgeValueChange={this.onParticipantAgeValueChange}
            onParticipantTypeChange={this.onParticipantTypeChange}
            onParticipantStatusChange={this.onParticipantStatusChange}
            onParticipantRelationshipChange={
              this.onParticipantRelationshipChange
            }
          />
          <LocationForm
            onUSStateChange={this.onUSStateChange}
            onCityOrCountyChange={this.onCityOrCountyChange}
            onHouseDistrictChange={this.onHouseDistrictChange}
            onSenateDistrictChange={this.onSenateDistrictChange}
          />
          <Button
            type="primary"
            onClick={this.fetchGunCrimes}
            disabled={this.state.waitingForData}
            className={styles.searchButton}
          >
            {this.state.waitingForData ? (
              <Spin
                spinning={this.state.waitingForData}
                indicator={<Icon type="loading" />}
              />
            ) : (
              'Search database'
            )}
          </Button>
        </section>

        {this.state.resultsAvailable ? (
          <CrimeResults
            gunCrimes={this.state.gunCrimes}
            dataFetchFailed={this.state.dataFetchFailed}
          />
        ) : null}
      </div>
    );
  }
}

export default SearchTool;
