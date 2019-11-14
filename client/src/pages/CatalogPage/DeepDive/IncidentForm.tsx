import React, { ChangeEvent } from 'react';
import DataForm from 'components/Forms/DataForm/DataForm';
import EqualityInput from 'components/Forms/EqualityInput/EqualityInput';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import FormField from 'components/Forms/FormField/FormField';
import MultiSelect from 'components/Forms/MultiSelect/MultiSelect';
import axios from 'axios';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';

interface IncidentFormProps {
  onCharacteristicChange: (characteristics: string[]) => void;
  onKilledEqualityChange: (value: string) => void;
  onKillCountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInjuredEqualityChange: (value: string) => void;
  onInjuredCountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDateRangeChange: (
    dates: RangePickerValue,
    dateStrings: [string, string]
  ) => void;
}

interface IncidentFormState {
  waitingForIncidentData: boolean;
  incidentCharacteristics: string[];
}

class IncidentForm extends React.Component<
  IncidentFormProps,
  IncidentFormState
> {
  public constructor(props: IncidentFormProps) {
    super(props);
    this.state = {
      waitingForIncidentData: true,
      incidentCharacteristics: [],
    };
    this.getIncidentCharacteristics();
  }

  private getIncidentCharacteristics = async () => {
    try {
      const response = await axios.get('/api/incident/characteristics');

      const characteristics: string[] = [];
      response.data.forEach((c: { INCIDENT_CHARACTERISTIC: string }) =>
        characteristics.push(c.INCIDENT_CHARACTERISTIC)
      );

      this.setState({
        waitingForIncidentData: false,
        incidentCharacteristics: characteristics,
      });
    } catch (error) {}
  };

  public render() {
    return (
      <DataForm>
        <h2>Crime Characteristics</h2>

        <FormField label="Incident type">
          <MultiSelect
            style={{ minWidth: '200px' }}
            placeholder={
              this.state.waitingForIncidentData ? (
                <LoadingSpin />
              ) : (
                'Select incident types'
              )
            }
            data={this.state.incidentCharacteristics}
            disabled={this.state.waitingForIncidentData}
            onChange={this.props.onCharacteristicChange}
          />
        </FormField>

        <FormField label="Number killed">
          <EqualityInput
            numericalMinimum={0}
            onEqualityChange={this.props.onKilledEqualityChange}
            onNumberChange={this.props.onKillCountChange}
          />
        </FormField>

        <FormField label="Number injured">
          <EqualityInput
            numericalMinimum={0}
            onEqualityChange={this.props.onInjuredEqualityChange}
            onNumberChange={this.props.onInjuredCountChange}
          />
        </FormField>

        <FormField label="Time range">
          <DateRangePicker onChange={this.props.onDateRangeChange} />
        </FormField>
      </DataForm>
    );
  }
}

export default IncidentForm;
