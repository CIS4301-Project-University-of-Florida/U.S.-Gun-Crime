import React from 'react';
import { Form, Select } from 'antd';
import { incidentCharacteristics } from 'mockData/MockData';
import DataForm from './DataForm/DataForm';

const { Option } = Select;

const IncidentForm = () => {
  return (
    <DataForm>
      <h2>Crime Characteristics</h2>

      <Form.Item label="Incident type">
        <Select
          mode="multiple"
          style={{ width: '100%', minWidth: '200px' }}
          placeholder="Select incident types"
          dropdownMatchSelectWidth={false}
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
