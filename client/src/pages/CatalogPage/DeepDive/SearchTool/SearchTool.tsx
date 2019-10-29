import React from 'react';
import IncidentForm from '../IncidentForm';
import GunForm from '../GunForm';
import LocationForm from '../LocationForm';
import { Button, Icon } from 'antd';
import CrimeCard from '../CrimeCard/CrimeCard';

class SearchTool extends React.Component {
  public render() {
    return (
      <div>
        <IncidentForm />
        <GunForm />
        <LocationForm />
        <Button type="primary">Search database</Button>
        <CrimeCard
          title={
            <div>
              <Icon type="calendar" />
              06/18/2016
            </div>
          }
        />
      </div>
    );
  }
}

export default SearchTool;
