import React from 'react';
import { Form, Select } from 'antd';
import { incidentCharacteristics } from 'mockData/MockData';

const { Option } = Select;

const IncidentForm = () => {
  return (
    <Form
      layout="inline"
      style={{
        marginBottom: '20px',
        backgroundColor: '#edf2f5',
        padding: '20px',
      }}
    >
      <h2>Crime Characteristics</h2>

      <Form.Item label="Characteristics" hasFeedback={true}>
        <Select
          mode="multiple"
          style={{ width: '100%', minWidth: '200px' }}
          placeholder="Select crime types"
          dropdownMatchSelectWidth={false}
        >
          {incidentCharacteristics.map(characteristic => (
            <Option key={characteristic} value={characteristic}>
              {characteristic}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default IncidentForm;
