import React, { useState } from 'react';
import DataForm from 'components/Forms/DataForm/DataForm';
import axios from 'axios';
import { ANY_OPTION } from '../AnyOption';
import FormField from 'components/Forms/FormField/FormField';
import { Radio } from 'antd';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import EqualityInput from 'components/Forms/EqualityInput/EqualityInput';
import { SelectValue } from 'antd/lib/select';
import { RadioChangeEvent } from 'antd/lib/radio';
import SelectSearch from 'components/Forms/SelectSearch/SelectSearch';
import { useEffect } from 'react';

interface ParticipantFormProps {
  onParticipantQualifierChange: (qualifier: string) => void;
  onParticipantGenderChange: (gender: string) => void;
  onParticipantAgeEqualityChange: (equality: string) => void;
  onParticipantAgeValueChange: (age: number) => void;
  onParticipantTypeChange: (type: string) => void;
  onParticipantStatusChange: (status: string) => void;
  onParticipantRelationshipChange: (relationship: string) => void;
}

const ParticipantForm = (props: ParticipantFormProps) => {
  const [waitingForGenders, setWaitingForGenders] = useState<boolean>(true);
  const [genders, setGenders] = useState<string[]>([]);
  const [waitingForTypes, setWaitingForTypes] = useState<boolean>(true);
  const [types, setTypes] = useState<string[]>([]);
  const [waitingForStatuses, setWaitingForStatuses] = useState<boolean>(true);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [waitingForRelationships, setWaitingForRelationships] = useState<
    boolean
  >(true);
  const [relationships, setRelationships] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGenders() {
      try {
        const response = await axios.get('/api/participant/genders');

        const participantGenders: string[] = [ANY_OPTION];
        response.data.forEach((p: { GENDER: string }) =>
          participantGenders.push(p.GENDER)
        );

        setWaitingForGenders(false);
        setGenders(participantGenders);
      } catch (error) {
        console.log(`fetchGenders: ${error}`);
      }
    }
    fetchGenders();
  }, []);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await axios.get('/api/participant/types');

        const participantTypes: string[] = [ANY_OPTION];
        response.data.forEach((p: { TYPE: string }) =>
          participantTypes.push(p.TYPE)
        );

        setWaitingForTypes(false);
        setTypes(participantTypes);
      } catch (error) {
        console.log(`fetchTypes: ${error}`);
      }
    }
    fetchTypes();
  }, []);

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const response = await axios.get('/api/participant/statuses');

        const participantStatuses: string[] = [];
        response.data.forEach((p: { STATUS: string }) =>
          participantStatuses.push(p.STATUS)
        );

        setWaitingForStatuses(false);
        setStatuses(participantStatuses);
      } catch (error) {
        console.log(`fetchStatuses: ${error}`);
      }
    }
    fetchStatuses();
  }, []);

  useEffect(() => {
    async function fetchRelationships() {
      try {
        const response = await axios.get('/api/participant/relationships');

        const participantRelationships: string[] = [];
        response.data.forEach((p: { RELATIONSHIP: string }) =>
          participantRelationships.push(p.RELATIONSHIP)
        );

        setWaitingForRelationships(false);
        setRelationships(participantRelationships);
      } catch (error) {
        console.log(`fetchRelationships: ${error}`);
      }
    }
    fetchRelationships();
  }, []);

  const onQualifierChange = (event: SelectValue) => {
    props.onParticipantQualifierChange(event.toString());
  };

  const onGenderChange = (event: RadioChangeEvent) => {
    const gender = event.target.value;
    props.onParticipantGenderChange(gender === ANY_OPTION ? '' : gender);
  };

  const onAgeEqualityChange = (value: string) => {
    props.onParticipantAgeEqualityChange(value);
  };

  const onAgeValueChange = (age: number) => {
    props.onParticipantAgeValueChange(age);
  };

  const onTypeChange = (event: RadioChangeEvent) => {
    const type = event.target.value;
    props.onParticipantTypeChange(type === ANY_OPTION ? '' : type);
  };

  const onStatusChange = (status: SelectValue | undefined) => {
    props.onParticipantStatusChange(status ? status.toString() : '');
  };

  const onRelationshipChange = (relationship: SelectValue | undefined) => {
    props.onParticipantRelationshipChange(
      relationship ? relationship.toString() : ''
    );
  };

  return (
    <DataForm>
      <h2>Participants</h2>

      <div>
        Gun crimes involving{' '}
        <SelectSearch
          data={['any', 'only']}
          defaultValue={'any'}
          style={{ width: '100px' }}
          allowClear={false}
          onChange={onQualifierChange}
        />{' '}
        participants with these characteristics:
      </div>

      <div>
        <FormField label="Gender">
          <Radio.Group
            options={genders}
            defaultValue={ANY_OPTION}
            onChange={onGenderChange}
          >
            {waitingForGenders ? <LoadingSpin /> : null}
          </Radio.Group>
        </FormField>

        <FormField label="Age">
          <EqualityInput
            onEqualityChange={onAgeEqualityChange}
            onNumberChange={onAgeValueChange}
            numericalMinimum={0}
          />
        </FormField>

        <FormField label="Type">
          <Radio.Group
            options={types}
            defaultValue={ANY_OPTION}
            onChange={onTypeChange}
          >
            {waitingForTypes ? <LoadingSpin /> : null}
          </Radio.Group>
        </FormField>

        <FormField label="Status" style={{ width: '100%' }}>
          <SelectSearch
            style={{ minWidth: '300px', width: '100%' }}
            dropdownMatchSelectWidth={false}
            data={statuses}
            disabled={waitingForStatuses}
            onChange={onStatusChange}
            placeholder={
              waitingForStatuses ? <LoadingSpin /> : 'Select a status...'
            }
          />
        </FormField>

        <FormField label="Relationship" style={{ width: '100%' }}>
          <SelectSearch
            style={{ minWidth: '300px', width: '100%' }}
            dropdownMatchSelectWidth={false}
            data={relationships}
            disabled={waitingForRelationships}
            onChange={onRelationshipChange}
            placeholder={
              waitingForRelationships ? (
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
};

export default ParticipantForm;
