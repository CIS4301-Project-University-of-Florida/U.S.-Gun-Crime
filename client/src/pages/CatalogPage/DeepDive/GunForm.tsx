import React from 'react';
import { Form, Select, Input, Checkbox } from 'antd';
import { gunTypes } from 'mockData/MockData';
import DataForm from './DataForm/DataForm';
import SelectSearch from './SelectSearch/SelectSearch';
const { Option } = Select;

const equalityOptions = ['>=', '>', '=', '<', '<='];

interface GunFormProps {
  onGunTypeChange: (gunTypes: string[]) => void;
}

const GunForm = (props: GunFormProps) => {
  return (
    <DataForm>
      <h2>Gun Characteristics</h2>
      <Form.Item label="Types of guns involved">
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
