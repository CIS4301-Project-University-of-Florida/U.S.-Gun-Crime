import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';

class DeepDive extends React.Component {
  public render() {
    return <Page title={PageEnum.DEEP_DIVE.title} />;
  }
}

export default DeepDive;
