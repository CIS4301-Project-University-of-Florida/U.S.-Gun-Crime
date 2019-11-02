import React, { ChangeEvent } from 'react';
import { gunTypes } from 'mockData/MockData';
import DataForm from './DataForm/DataForm';
import EqualityInput from 'components/Forms/EqualityInput/EqualityInput';
import FormField from 'components/Forms/FormField/FormField';
import MultiSelect from 'components/Forms/MultiSelect/MultiSelect';

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
      <FormField label="Number">
        <EqualityInput
          onEqualityChange={props.onGunCountEqualityChange}
          onNumberChange={props.onGunCountChange}
          numericalMinimum={0}
        />
      </FormField>
      <FormField label="Gun types">
        <MultiSelect
          style={{ minWidth: '200px' }}
          placeholder="Select gun types"
          onChange={props.onGunTypeChange}
          data={gunTypes}
        />
      </FormField>
    </DataForm>
  );
};

export default GunForm;
