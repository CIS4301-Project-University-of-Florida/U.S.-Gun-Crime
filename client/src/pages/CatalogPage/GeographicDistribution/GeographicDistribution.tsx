import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import GoogleMapReact from 'google-map-react';

const GeographicDistribution: React.FC = () => {
  const mapCenter = { lat: 39, lng: -98 };

  return <Page title={PageEnum.GEOGRAPHIC_DISTRIBUTION.title} />;
};

export default GeographicDistribution;
