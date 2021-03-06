import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.module.less';
import { PageEnum } from 'pages/PageEnum';

const App = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={PageEnum.HOME.url}
        component={PageEnum.HOME.component}
      />
      <Route
        path={PageEnum.DATA_VISUALIZATIONS.url}
        component={PageEnum.DATA_VISUALIZATIONS.component}
      />
      <Route
        path={PageEnum.RANKINGS.url}
        component={PageEnum.RANKINGS.component}
      />
      <Route
        path={PageEnum.DEEP_DIVE.url}
        component={PageEnum.DEEP_DIVE.component}
      />
      <Route
        path={PageEnum.GEOGRAPHIC_DISTRIBUTION.url}
        component={PageEnum.GEOGRAPHIC_DISTRIBUTION.component}
      />
    </Switch>
  );
};

export default App;
