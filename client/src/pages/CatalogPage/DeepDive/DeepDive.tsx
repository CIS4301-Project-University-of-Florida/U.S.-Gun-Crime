import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';
import SearchTool from './SearchTool/SearchTool';

const DeepDive = () => {
  return (
    <Page title={PageEnum.DEEP_DIVE.title}>
      <p>
        Apply any combination of the filters below to get a list of gun crimes
        matching your criteria.
      </p>
      <SearchTool />
    </Page>
  );
};

export default DeepDive;
