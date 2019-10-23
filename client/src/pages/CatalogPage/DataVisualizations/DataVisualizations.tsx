import React from 'react';
import Page from 'components/Layout/Page/Page';
import { PageEnum } from 'pages/PageEnum';

class DataVisualizations extends React.Component {
  public render() {
    return <Page title={PageEnum.DATA_VISUALIZATIONS.title} />;
  }
}

export default DataVisualizations;
