import React, { ChangeEvent } from 'react';
import IncidentForm from '../IncidentForm';
import GunForm from '../GunForm';
import LocationForm from '../LocationForm';
import { Button, Icon, Spin, Result } from 'antd';
import CrimeCard from '../CrimeCard/CrimeCard';
import { SelectValue } from 'antd/lib/select';
import axios from 'axios';
import { equalityDefault } from 'components/Forms/EqualityInput/EqualityInput';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import ParticipantForm from '../../ParticipantForm/ParticipantForm';
import Participant from 'pages/CatalogPage/ParticipantForm/Participant';
import { ANY_OPTION } from '../AnyOption';
import { GunCrime } from 'pages/CatalogPage/GunCrime';
import styles from './SearchTool.module.less';
import moment from 'moment';

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

  resultsAvailable: boolean;
  waitingForData: boolean;
  gunCrimes: GunCrime[];
}

const initialState: SearchToolState = {
  characteristics: [],
  numKilled: { equality: equalityDefault, count: 0 },
  numInjured: { equality: equalityDefault, count: 0 },
  dateRange: ['', ''],
  numGuns: { equality: equalityDefault, count: 0 },
  gunTypes: [],
  participant: {
    qualifier: 'any',
    gender: ANY_OPTION,
    age: { equality: equalityDefault, count: 0 },
    type: '',
    status: '',
    relationship: '',
  },
  usState: '',
  cityOrCounty: '',
  houseDistrict: '',
  senateDistrict: '',
  resultsAvailable: false,
  waitingForData: false,
  gunCrimes: [],
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
    this.setState({
      ...this.state,
      dateRange: dateStrings,
    });
  };

  public onGunCountEqualityChange = (equality: string) => {
    this.setState({
      ...this.state,
      numGuns: { equality, count: this.state.numGuns.count },
    });
  };

  public onGunCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      numGuns: {
        equality: this.state.numGuns.equality,
        count: Number(event.target.value),
      },
    });
  };

  public onGunTypeChange = (gunTypes: string[]) => {
    this.setState({
      ...this.state,
      gunTypes,
    });
  };

  public onParticipantQualifierChange = (qualifier: string) => {
    this.setState({
      ...this.state,
      participant: { ...this.state.participant, qualifier },
    });
  };

  public onParticipantGenderChange = (gender: string) => {
    this.setState({
      ...this.state,
      participant: { ...this.state.participant, gender },
    });
  };

  public onParticipantAgeEqualityChange = (equality: string) => {
    this.setState({
      ...this.state,
      participant: {
        ...this.state.participant,
        age: { ...this.state.participant.age, equality },
      },
    });
  };

  public onParticipantAgeValueChange = (age: number) => {
    this.setState({
      ...this.state,
      participant: {
        ...this.state.participant,
        age: { ...this.state.participant.age, count: age },
      },
    });
  };

  public onParticipantTypeChange = (type: string) => {
    this.setState({
      ...this.state,
      participant: { ...this.state.participant, type },
    });
  };

  public onParticipantStatusChange = (status: string) => {
    this.setState({
      ...this.state,
      participant: { ...this.state.participant, status },
    });
  };

  public onParticipantRelationshipChange = (relationship: string) => {
    this.setState({
      ...this.state,
      participant: { ...this.state.participant, relationship },
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
    this.setState(
      {
        ...this.state,
        waitingForData: true,
        gunCrimes: [],
        resultsAvailable: false,
      },
      () => console.log(this.state)
    );

    try {
      // Separate out the things we don't need for the payload using destructuring and spread
      const {
        waitingForData,
        resultsAvailable,
        gunCrimes,
        ...payload
      } = this.state;

      const response = await axios.post('/api/deepdive', payload);
      this.setState({
        ...this.state,
        gunCrimes: response.data,
        resultsAvailable: true,
      });
    } catch (error) {
      this.setState({ ...this.state, resultsAvailable: false });
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
            onClick={this.requestGunCrimesFromAPI}
            disabled={this.state.waitingForData}
            style={{ width: '175px', height: '40px' }}
          >
            {this.state.waitingForData ? (
              <Spin
                spinning={this.state.waitingForData}
                indicator={<Icon type="loading" />}
                style={{ marginLeft: '5px' }}
              />
            ) : (
              'Search database'
            )}
          </Button>
        </section>

        {/* TODO: statistics at a glance section. Also, consider refactoring the results out of this? */}

        <section className={styles.searchResults}>
          {this.state.gunCrimes.length !== 0 ? (
            this.state.gunCrimes.map((crime: GunCrime) => (
              <CrimeCard
                title={`#${crime.INCIDENT_ID} on ${moment(
                  crime.INCIDENT_DATE
                ).format('MM/DD/YYYY')}`}
                key={crime.INCIDENT_ID}
                {...crime}
              />
            ))
          ) : this.state.resultsAvailable ? (
            <Result
              icon={<Icon type="frown" theme="twoTone" />}
              title="No data found"
              subTitle="Try changing the search parameters"
            />
          ) : null}
        </section>
      </div>
    );
  }
}

export default SearchTool;
