import React, { useState } from 'react';
import DataForm from 'components/Forms/DataForm/DataForm';
import EqualityInput from 'components/Forms/EqualityInput/EqualityInput';
import FormField from 'components/Forms/FormField/FormField';
import MultiSelect from 'components/Forms/MultiSelect/MultiSelect';
import axios from 'axios';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import { useEffect } from 'react';

interface GunFormProps {
  onGunTypeChange: (gunTypes: string[]) => void;
  onGunCountEqualityChange: (equality: string) => void;
  onGunCountChange: (count: number) => void;
}

const GunForm = (props: GunFormProps) => {
  const [waitingForTypeData, setWaitingForTypeData] = useState<boolean>(true);
  const [gunTypes, setGunTypes] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGunTypes() {
      try {
        const response = await axios.get('/api/gun/types');

        const types: string[] = [];
        response.data.forEach((g: { TYPE: string }) => types.push(g.TYPE));

        setWaitingForTypeData(false);
        setGunTypes(types);
      } catch (error) {
        console.log(`GunForm's fetchGunTypeData: ${error}`);
      }
    }
    fetchGunTypes();
  }, []);

  return (
    <DataForm>
      <h2>Guns Involved</h2>
      <FormField label="Number">
        <EqualityInput
          onEqualityChange={props.onGunCountEqualityChange}
          onNumberChange={props.onGunCountChange}
          numericalMinimum={1}
        />
      </FormField>
      <FormField label="Gun types">
        <MultiSelect
          style={{ minWidth: '200px' }}
          disabled={waitingForTypeData}
          placeholder={
            waitingForTypeData ? <LoadingSpin /> : 'Select gun types...'
          }
          onChange={props.onGunTypeChange}
          data={gunTypes}
        />
      </FormField>
    </DataForm>
  );
};

export default GunForm;
