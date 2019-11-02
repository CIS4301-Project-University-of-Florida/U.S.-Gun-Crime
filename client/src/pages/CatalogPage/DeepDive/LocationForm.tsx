import React from 'react';
import {
  states,
  citiesOrCounties,
  senateDistricts,
  houseDistricts,
} from 'mockData/MockData';
import DataForm from './DataForm/DataForm';
import SelectSearch from 'components/Forms/SelectSearch/SelectSearch';
import { SelectValue } from 'antd/lib/select';
import FormField from 'components/Forms/FormField/FormField';

interface LocationFormProps {
  onUSStateChange: (value: SelectValue | undefined) => void;
  onCityOrCountyChange: (value: SelectValue | undefined) => void;
  onHouseDistrictChange: (value: SelectValue | undefined) => void;
  onSenateDistrictChange: (value: SelectValue | undefined) => void;
}

const LocationForm = (props: LocationFormProps) => {
  return (
    <DataForm>
      <h2>Location</h2>
      <FormField label="State">
        <SelectSearch
          data={states}
          placeholder="Select a state..."
          onChange={props.onUSStateChange}
        />
      </FormField>

      <FormField label="City">
        <SelectSearch
          data={citiesOrCounties}
          placeholder="Select a city or county..."
          onChange={props.onCityOrCountyChange}
        />
      </FormField>

      <FormField label="House district">
        <SelectSearch
          data={houseDistricts}
          placeholder="(State level)"
          onChange={props.onHouseDistrictChange}
        />
      </FormField>

      <FormField label="Senate district">
        <SelectSearch
          data={senateDistricts}
          placeholder="(State level)"
          onChange={props.onSenateDistrictChange}
        />
      </FormField>
    </DataForm>
  );
};

export default LocationForm;
