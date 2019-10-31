import React from 'react';
import { Form, Select } from 'antd';
import { incidentCharacteristics } from 'mockData/MockData';
import DataForm from './DataForm/DataForm';
const { Option } = Select;

interface IncidentFormProps {
  onCharacteristicChange: (characteristics: string[]) => void;
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
    </DataForm>
  );
};

export default IncidentForm;
