import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';

class Rankings extends React.Component {
  public render() {
    return <Page title={PageEnum.RANKINGS.title} />;
  }
}

export default Rankings;
