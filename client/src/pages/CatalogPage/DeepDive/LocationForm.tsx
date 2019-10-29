import React from 'react';
import { Form } from 'antd';
import {
  states,
  citiesOrCounties,
  senateDistricts,
  houseDistricts,
} from 'mockData/MockData';
import { DatePicker } from 'antd';
import DataForm from './DataForm/DataForm';
import SelectSearch from './SelectSearch/SelectSearch';

const { RangePicker } = DatePicker;

const LocationForm = () => {
  return (
    <DataForm>
      <h2>Location & Time</h2>
      <Form.Item label="State">
        <SelectSearch data={states} placeholder="Select a state..." />
      </Form.Item>

      <Form.Item label="City">
        <SelectSearch
          data={citiesOrCounties}
          placeholder="Select a city or county..."
        />
      </Form.Item>

      <Form.Item label="House district">
        <SelectSearch data={houseDistricts} placeholder="(State level)" />
      </Form.Item>

      <Form.Item label="Senate district">
        <SelectSearch data={senateDistricts} placeholder="(State level)" />
      </Form.Item>

      <Form.Item label="Time range">
        <RangePicker />
      </Form.Item>
    </DataForm>
  );
};

export default LocationForm;
