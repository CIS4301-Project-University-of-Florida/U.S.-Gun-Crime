import React, { ChangeEvent } from 'react';
import { Form, Select } from 'antd';
import { gunTypes } from 'mockData/MockData';
import DataForm from './DataForm/DataForm';
import EqualityInput from 'components/EqualityInput/EqualityInput';
const { Option } = Select;

interface GunFormProps {
  onGunTypeChange: (gunTypes: string[]) => void;
  onGunCountEqualityChange: (equality: string) => void;
  onGunCountChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// TODO: prevent users from entering more tags than the number of guns specified if equality is < or <=

const GunForm = (props: GunFormProps) => {
  return (
    <DataForm>
      <h2>Guns Involved</h2>
      <Form.Item label="Number">
        <EqualityInput
          onEqualityChange={props.onGunCountEqualityChange}
          onNumberChange={props.onGunCountChange}
          numericalMinimum={0}
        />
      </Form.Item>
      <Form.Item label="Gun types">
        <Select
          mode="multiple"
          style={{ width: '100%', minWidth: '200px' }}
          placeholder="Select gun types"
          dropdownMatchSelectWidth={false}
          onChange={props.onGunTypeChange}
        >
          {gunTypes.map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </DataForm>
  );
};

export default GunForm;
