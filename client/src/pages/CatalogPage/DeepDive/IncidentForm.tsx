import React, { ChangeEvent } from 'react';
import { Select } from 'antd';
import { incidentCharacteristics } from 'mockData/MockData';
import DataForm from './DataForm/DataForm';
import EqualityInput from 'components/EqualityInput/EqualityInput';
import { DatePicker } from 'antd';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import moment from 'moment';
import FormField from 'components/FormField/FormField';

const { Option } = Select;
const { RangePicker } = DatePicker;

export const earliestDate = '01/01/2013';
export const latestDate = '12/31/2018';

const forbiddenDates = (current: moment.Moment | undefined) => {
  return (
    !current || current.isBefore(earliestDate) || current.isAfter(latestDate)
  );
};

interface IncidentFormProps {
  onCharacteristicChange: (characteristics: string[]) => void;
  onKilledEqualityChange: (value: string) => void;
  onKillCountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInjuredEqualityChange: (value: string) => void;
  onInjuredCountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDateRangeChange: (
    dates: RangePickerValue,
    dateStrings: [string, string]
  ) => void;
}

const IncidentForm = (props: IncidentFormProps) => {
  return (
    <DataForm>
      <h2>Crime Characteristics</h2>

      <FormField label="Incident type">
        <Select
          mode="multiple"
          style={{ width: '100%', minWidth: '200px' }}
          placeholder="Select incident types"
          dropdownMatchSelectWidth={false}
          onChange={props.onCharacteristicChange}
        >
          {incidentCharacteristics.map(characteristic => (
            <Option key={characteristic} value={characteristic}>
              {characteristic}
            </Option>
          ))}
        </Select>
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
        <RangePicker
          onChange={props.onDateRangeChange}
          format="MM/DD/YYYY"
          defaultPickerValue={[moment(earliestDate), moment(latestDate)]}
          disabledDate={forbiddenDates}
        />
      </FormField>
    </DataForm>
  );
};

export default IncidentForm;
