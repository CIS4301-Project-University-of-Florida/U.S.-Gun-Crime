import React, { ChangeEvent } from 'react';
import DataForm from 'components/Forms/DataForm/DataForm';
import EqualityInput from 'components/Forms/EqualityInput/EqualityInput';
import FormField from 'components/Forms/FormField/FormField';
import MultiSelect from 'components/Forms/MultiSelect/MultiSelect';
import axios from 'axios';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';

interface GunFormProps {
  onGunTypeChange: (gunTypes: string[]) => void;
  onGunCountEqualityChange: (equality: string) => void;
  onGunCountChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface GunFormState {
  waitingForGunTypeData: boolean;
  gunTypes: string[];
}

// TODO: prevent users from entering more tags than the number of guns specified if equality is < or <=

class GunForm extends React.Component<GunFormProps, GunFormState> {
  public constructor(props: GunFormProps) {
    super(props);
    this.state = {
      waitingForGunTypeData: true,
      gunTypes: [],
    };
    this.fetchGunTypeData();
  }

  private fetchGunTypeData = async () => {
    try {
      const response = await axios.get('/api/gun/types');

      const gunTypes: string[] = [];
      response.data.forEach((g: { TYPE: string }) => gunTypes.push(g.TYPE));

      this.setState({
        ...this.state,
        waitingForGunTypeData: false,
        gunTypes,
      });
    } catch (error) {}
  };

  public render() {
    return (
      <DataForm>
        <h2>Guns Involved</h2>
        <FormField label="Number">
          <EqualityInput
            onEqualityChange={this.props.onGunCountEqualityChange}
            onNumberChange={this.props.onGunCountChange}
            numericalMinimum={1}
          />
        </FormField>
        <FormField label="Gun types">
          <MultiSelect
            style={{ minWidth: '200px' }}
            disabled={this.state.waitingForGunTypeData}
            placeholder={
              this.state.waitingForGunTypeData ? (
                <LoadingSpin />
              ) : (
                'Select gun types...'
              )
            }
            onChange={this.props.onGunTypeChange}
            data={this.state.gunTypes}
          />
        </FormField>
      </DataForm>
    );
  }
}

export default GunForm;
