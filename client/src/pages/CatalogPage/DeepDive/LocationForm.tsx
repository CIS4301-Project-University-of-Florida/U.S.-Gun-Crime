import React from 'react';
import { Form, AutoComplete } from 'antd';
import {
  states,
  citiesOrCounties,
  senateDistricts,
  houseDistricts,
} from 'mockData/MockData';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const LocationForm = () => {
  return (
    <Form
      layout="inline"
      style={{
        marginBottom: '20px',
        backgroundColor: '#edf2f5',
        padding: '20px',
      }}
    >
      <h2>Location & Time</h2>
      <Form.Item label="State" hasFeedback={true}>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={states}
          placeholder="Select a state..."
        />
      </Form.Item>

      <Form.Item label="City" hasFeedback={true}>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={citiesOrCounties}
          placeholder="Select a city..."
        />
      </Form.Item>

      <Form.Item label="House district" hasFeedback={true}>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={houseDistricts}
          placeholder="(State level)"
        />
      </Form.Item>

      <Form.Item label="Senate district" hasFeedback={true}>
        <AutoComplete
          style={{ width: 200 }}
          dataSource={senateDistricts}
          placeholder="(State level)"
        />
      </Form.Item>

      <Form.Item label="Time range" hasFeedback={true}>
        <RangePicker />
      </Form.Item>
    </Form>
  );
};

export default LocationForm;
