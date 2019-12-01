import React, { useEffect } from 'react';
import DataForm from 'components/Forms/DataForm/DataForm';
import EqualityInput from 'components/Forms/EqualityInput/EqualityInput';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import FormField from 'components/Forms/FormField/FormField';
import MultiSelect from 'components/Forms/MultiSelect/MultiSelect';
import axios from 'axios';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';
import { useState } from 'react';

interface IncidentFormProps {
  onCharacteristicChange: (characteristics: string[]) => void;
  onKilledEqualityChange: (value: string) => void;
  onKillCountChange: (count: number) => void;
  onInjuredEqualityChange: (value: string) => void;
  onInjuredCountChange: (count: number) => void;
  onDateRangeChange: (
    dates: RangePickerValue,
    dateStrings: [string, string]
  ) => void;
}

const IncidentForm = (props: IncidentFormProps) => {
  const [waitingForCharacteristics, setWaitingForCharacteristics] = useState<
    boolean
  >(true);
  const [characteristics, setCharacteristics] = useState<string[]>([]);

  useEffect(() => {
    async function fetchIncidentCharacteristics() {
      try {
        const response = await axios.get('/api/incident/characteristics');

        const incidentCharacteristics: string[] = [];
        response.data.forEach((c: { INCIDENT_CHARACTERISTIC: string }) =>
          incidentCharacteristics.push(c.INCIDENT_CHARACTERISTIC)
        );

        setWaitingForCharacteristics(false);
        setCharacteristics(incidentCharacteristics);
      } catch (error) {
        console.log(`IncidentForm's fetchIncidentCharacteristics: ${error}`);
      }
    }
    fetchIncidentCharacteristics();
  }, []);

  return (
    <DataForm>
      <h2>Crime Characteristics</h2>

      <FormField label="Incident type">
        <MultiSelect
          style={{ minWidth: '200px' }}
          placeholder={
            waitingForCharacteristics ? (
              <LoadingSpin />
            ) : (
              'Select incident types'
            )
          }
          data={characteristics}
          disabled={waitingForCharacteristics}
          onChange={props.onCharacteristicChange}
        />
      </FormField>

      <FormField label="Number killed">
        <EqualityInput
          numericalMinimum={0}
          onEqualityChange={props.onKilledEqualityChange}
          onNumberChange={props.onKillCountChange}
        />
      </FormField>

      <FormField label="Number injured">
        <EqualityInput
          numericalMinimum={0}
          onEqualityChange={props.onInjuredEqualityChange}
          onNumberChange={props.onInjuredCountChange}
        />
      </FormField>

      <FormField label="Time range">
        <DateRangePicker onChange={props.onDateRangeChange} />
      </FormField>
    </DataForm>
  );
};

export default IncidentForm;
