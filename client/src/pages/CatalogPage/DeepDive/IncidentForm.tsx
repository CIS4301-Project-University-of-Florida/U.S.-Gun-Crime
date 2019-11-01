import React, { ChangeEvent } from 'react';
import { Form, Select } from 'antd';
import { incidentCharacteristics } from 'mockData/MockData';
import DataForm from './DataForm/DataForm';
import EqualityInput from 'components/EqualityInput/EqualityInput';
const { Option } = Select;

interface IncidentFormProps {
  onCharacteristicChange: (characteristics: string[]) => void;
  onKilledEqualityChange: (value: string) => void;
  onKillCountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInjuredEqualityChange: (value: string) => void;
  onInjuredCountChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const IncidentForm = (props: IncidentFormProps) => {
  return (
    <DataForm>
      <h2>Crime Characteristics</h2>

      <Form.Item label="Incident type">
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
      </Form.Item>

      {/* TODO: make a component that has the equality select + number combo and handle all the logic in there
        for what should happen if, e.g., < is selected, then the min should be 1 and not 0, and so on */}
      <Form.Item label="Number killed">
        <EqualityInput
          numericalMinimum={0}
          onEqualityChange={props.onKilledEqualityChange}
          onNumberChange={props.onKillCountChange}
        />
      </Form.Item>

      <Form.Item label="Number injured">
        <EqualityInput
          numericalMinimum={0}
          onEqualityChange={props.onInjuredEqualityChange}
          onNumberChange={props.onInjuredCountChange}
        />
      </Form.Item>
    </DataForm>
  );
};

export default IncidentForm;
