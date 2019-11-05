import React, { ChangeEvent } from 'react';
import DataForm from 'components/Forms/DataForm/DataForm';
import axios from 'axios';
import { ANY_OPTION } from '../DeepDive/AnyOption';
import FormField from 'components/Forms/FormField/FormField';
import { Radio } from 'antd';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import EqualityInput from 'components/Forms/EqualityInput/EqualityInput';
import { SelectValue } from 'antd/lib/select';
import { RadioChangeEvent } from 'antd/lib/radio';
import SelectSearch from 'components/Forms/SelectSearch/SelectSearch';
import styles from './ParticipantForm.module.less';

interface ParticipantFormProps {
  onParticipantQualifierChange: (qualifier: string) => void;
  onParticipantGenderChange: (gender: string) => void;
  onParticipantAgeEqualityChange: (equality: string) => void;
  onParticipantAgeValueChange: (age: number) => void;
  onParticipantTypeChange: (type: string) => void;
  onParticipantStatusChange: (status: string) => void;
  onParticipantRelationshipChange: (relationship: string) => void;
}

interface ParticipantFormState {
  waitingForParticipantGenderData: boolean;
  participantGenders: string[];
  waitingForParticipantTypeData: boolean;
  participantTypes: string[];
  waitingForParticipantStatusData: boolean;
  participantStatuses: string[];
  waitingForParticipantRelationshipData: boolean;
  participantRelationships: string[];
}

class ParticipantForm extends React.Component<
  ParticipantFormProps,
  ParticipantFormState
> {
  public constructor(props: ParticipantFormProps) {
    super(props);
    this.state = {
      waitingForParticipantGenderData: true,
      participantGenders: [],
      waitingForParticipantTypeData: true,
      participantTypes: [],
      waitingForParticipantStatusData: true,
      participantStatuses: [],
      waitingForParticipantRelationshipData: true,
      participantRelationships: [],
    };
    this.fetchParticipantGenderData();
    this.fetchParticipantTypeData();
    this.fetchParticipantStatusData();
    this.fetchParticipantRelationshipData();
  }

  private fetchParticipantGenderData = async () => {
    try {
      const response = await axios.get('/api/participant/genders');

      const participantGenders: string[] = [ANY_OPTION];
      response.data.forEach((p: { GENDER: string }) =>
        participantGenders.push(p.GENDER)
      );

      this.setState({
        ...this.state,
        waitingForParticipantGenderData: false,
        participantGenders,
      });
    } catch (error) {
      console.log(`fetchParticipantGenderData: ${error}`);
    }
  };

  private fetchParticipantTypeData = async () => {
    try {
      const response = await axios.get('/api/participant/types');

      const participantTypes: string[] = [ANY_OPTION];
      response.data.forEach((p: { TYPE: string }) =>
        participantTypes.push(p.TYPE)
      );

      this.setState({
        ...this.state,
        waitingForParticipantTypeData: false,
        participantTypes,
      });
    } catch (error) {
      console.log(`fetchParticipantTypeData: ${error}`);
    }
  };

  private fetchParticipantStatusData = async () => {
    try {
      const response = await axios.get('/api/participant/statuses');

      const participantStatuses: string[] = [];
      response.data.forEach((p: { STATUS: string }) =>
        participantStatuses.push(p.STATUS)
      );

      this.setState({
        ...this.state,
        waitingForParticipantStatusData: false,
        participantStatuses,
      });
    } catch (error) {
      console.log(`fetchParticipantStatusData: ${error}`);
    }
  };

  private fetchParticipantRelationshipData = async () => {
    try {
      const response = await axios.get('/api/participant/relationships');

      const participantRelationships: string[] = [];
      response.data.forEach((p: { RELATIONSHIP: string }) =>
        participantRelationships.push(p.RELATIONSHIP)
      );

      this.setState({
        ...this.state,
        waitingForParticipantRelationshipData: false,
        participantRelationships,
      });
    } catch (error) {
      console.log(`fetchParticipantRelationshipData: ${error}`);
    }
  };

  private onQualifierChange = (event: SelectValue) => {
    this.props.onParticipantQualifierChange(event.toString());
  };

  private onGenderChange = (event: RadioChangeEvent) => {
    const gender = event.target.value;
    this.props.onParticipantGenderChange(gender === ANY_OPTION ? '' : gender);
  };

  private onAgeEqualityChange = (value: string) => {
    this.props.onParticipantAgeEqualityChange(value);
  };

  private onAgeValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onParticipantAgeValueChange(Number(event.target.value));
  };

  private onTypeChange = (event: RadioChangeEvent) => {
    const type = event.target.value;
    this.props.onParticipantTypeChange(type === ANY_OPTION ? '' : type);
  };

  private onStatusChange = (status: SelectValue | undefined) => {
    this.props.onParticipantStatusChange(status ? status.toString() : '');
  };

  private onRelationshipChange = (relationship: SelectValue | undefined) => {
    this.props.onParticipantRelationshipChange(
      relationship ? relationship.toString() : ''
    );
  };

  public render() {
    return (
      <DataForm>
        <h2>Participants</h2>

        <p>
          Gun crimes involving{' '}
          <SelectSearch
            data={['any', 'only']}
            defaultValue={'any'}
            style={{ width: '100px' }}
            allowClear={false}
            onChange={this.onQualifierChange}
          />{' '}
          participants with these characteristics:
        </p>

        <div className={styles.participantCharacteristics}>
          <FormField label="Gender">
            <Radio.Group
              options={this.state.participantGenders}
              defaultValue={ANY_OPTION}
              onChange={this.onGenderChange}
            >
              {this.state.waitingForParticipantGenderData ? (
                <LoadingSpin />
              ) : null}
            </Radio.Group>
          </FormField>

          <FormField label="Age">
            <EqualityInput
              onEqualityChange={this.onAgeEqualityChange}
              onNumberChange={this.onAgeValueChange}
              numericalMinimum={0}
            />
          </FormField>

          <FormField label="Type">
            <Radio.Group
              options={this.state.participantTypes}
              defaultValue={ANY_OPTION}
              onChange={this.onTypeChange}
            >
              {this.state.waitingForParticipantTypeData ? (
                <LoadingSpin />
              ) : null}
            </Radio.Group>
          </FormField>

          <FormField label="Status" style={{ width: '100%' }}>
            <SelectSearch
              style={{ minWidth: '300px', width: '100%' }}
              data={this.state.participantStatuses}
              disabled={this.state.waitingForParticipantStatusData}
              onChange={this.onStatusChange}
              placeholder={
                this.state.waitingForParticipantStatusData ? (
                  <LoadingSpin />
                ) : (
                  'Select a status...'
                )
              }
            />
          </FormField>

          <FormField label="Relationship" style={{ width: '100%' }}>
            <SelectSearch
              style={{ minWidth: '300px', width: '100%' }}
              data={this.state.participantRelationships}
              disabled={this.state.waitingForParticipantRelationshipData}
              onChange={this.onRelationshipChange}
              placeholder={
                this.state.waitingForParticipantRelationshipData ? (
                  <LoadingSpin />
                ) : (
                  'Select a relationship...'
                )
              }
            />
          </FormField>
        </div>
      </DataForm>
    );
  }
}

export default ParticipantForm;
