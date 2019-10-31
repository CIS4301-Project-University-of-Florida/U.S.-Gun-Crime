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
import { SelectValue } from 'antd/lib/select';
const { RangePicker } = DatePicker;

interface LocationFormProps {
  onUSStateChange: (value: SelectValue | undefined) => void;
  onCityOrCountyChange: (value: SelectValue | undefined) => void;
  onHouseDistrictChange: (value: SelectValue | undefined) => void;
  onSenateDistrictChange: (value: SelectValue | undefined) => void;
}

const LocationForm = (props: LocationFormProps) => {
  return (
    <DataForm>
      <h2>Location & Time</h2>
      <Form.Item label="State">
        <SelectSearch
          data={states}
          placeholder="Select a state..."
          onChange={props.onUSStateChange}
        />
      </Form.Item>

      <Form.Item label="City">
        <SelectSearch
          data={citiesOrCounties}
          placeholder="Select a city or county..."
          onChange={props.onCityOrCountyChange}
        />
      </Form.Item>

      <Form.Item label="House district">
        <SelectSearch
          data={houseDistricts}
          placeholder="(State level)"
          onChange={props.onHouseDistrictChange}
        />
      </Form.Item>

      <Form.Item label="Senate district">
        <SelectSearch
          data={senateDistricts}
          placeholder="(State level)"
          onChange={props.onSenateDistrictChange}
        />
      </Form.Item>

      <Form.Item label="Time range">
        <RangePicker />
      </Form.Item>
    </DataForm>
  );
};

export default LocationForm;
