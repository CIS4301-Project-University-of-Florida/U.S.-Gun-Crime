import React, { ChangeEvent } from 'react';
import DataForm from 'components/Forms/DataForm/DataForm';
import FormField from 'components/Forms/FormField/FormField';
import MultiSelect from 'components/Forms/MultiSelect/MultiSelect';
import axios from 'axios';
import LoadingSpin from 'components/LoadingSpin/LoadingSpin';
import { Radio } from 'antd';

// No need to query these; they're a small, limited number of fixed options.
// If this were an enterprise app, though, with new data arriving all the time,
// this would be unacceptable.
const genders = ['Any', 'Male (only)', 'Female (only)'];
const participantTypes = ['Any', 'Subject-Suspect', 'Victim'];

interface ParticipantFormProps {
  // TODO:
}

interface ParticipantFormState {
  waitingForParticipantRelationshipData: boolean;
  participantRelationships: string[];
}

class ParticipantForm extends React.Component<
  ParticipantFormProps,
  ParticipantFormState
> {
  public constructor(props: ParticipantFormProps) {
    super(props);
    this.state = {
      waitingForParticipantRelationshipData: true,
      participantRelationships: [],
    };
    this.fetchParticipantRelationshipData();
  }

  private fetchParticipantRelationshipData = async () => {
    try {
      const response = await axios.get('/api/participant/relationships');

      const participantRelationships: string[] = [];
      response.data.forEach((p: { RELATIONSHIP: string }) =>
        participantRelationships.push(p.RELATIONSHIP)
      );

      this.setState({
        ...this.state,
        waitingForParticipantRelationshipData: false,
        participantRelationships,
      });
    } catch (error) {}
  };

  // TODO: rethink the logic here... some of these need to be grouped together to make sense
  public render() {
    return (
      <DataForm>
        <h2>Participants Involved</h2>

        <FormField label="Gender">
          <Radio.Group options={genders} defaultValue={genders[0]} />
        </FormField>

        <FormField label="Types">
          <Radio.Group options={participantTypes} defaultValue="Any" />
        </FormField>

        <FormField label="Relationships">
          <MultiSelect
            style={{ minWidth: '200px' }}
            data={this.state.participantRelationships}
            disabled={this.state.waitingForParticipantRelationshipData}
            placeholder={
              this.state.waitingForParticipantRelationshipData ? (
                <LoadingSpin />
              ) : (
                'Select relationships...'
              )
            }
          />
        </FormField>
      </DataForm>
    );
  }
}

export default ParticipantForm;
