import React from 'react';
import { Form, AutoComplete, Input, Select } from 'antd';
import { gunTypes } from 'mockData/MockData';

const { Option } = Select;

const equalityOptions = ['>=', '>', '=', '<', '<='];

const GunForm = () => {
  return (
    <Form
      layout="inline"
      style={{
        marginBottom: '20px',
        backgroundColor: '#edf2f5',
        padding: '20px',
      }}
    >
      <h2>Gun Characteristics</h2>
      <Form.Item label="Type" hasFeedback={true}>
        <AutoComplete style={{ width: 200 }} dataSource={gunTypes} />
      </Form.Item>

      <Form.Item label="Number involved" hasFeedback={true}>
        <Select
          dropdownMatchSelectWidth={false}
          suffixIcon={undefined}
          style={{ width: '60px' }}
        >
          {equalityOptions.map((option: string) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <Input
          style={{ width: '60px', marginLeft: '5px', textAlign: 'right' }}
        />
      </Form.Item>
    </Form>
  );
};

export default GunForm;
