import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import LocationForm from './LocationForm';
import GunForm from './GunForm';
import IncidentForm from './IncidentForm';

class DeepDive extends React.Component {
  public render() {
    return (
      <Page title={PageEnum.DEEP_DIVE.title}>
        <p>
          Apply any combination of the filters below to get a list of gun crimes
          matching your criteria.
        </p>
        <IncidentForm />
        <GunForm />
        <LocationForm />
      </Page>
    );
  }
}

export default DeepDive;
