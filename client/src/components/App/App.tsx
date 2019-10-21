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
        path={PageEnum.DATA_CATALOG.url}
        component={PageEnum.DATA_CATALOG.component}
      />
      <Route path={PageEnum.ABOUT.url} component={PageEnum.ABOUT.component} />
    </Switch>
  );
};

export default App;
