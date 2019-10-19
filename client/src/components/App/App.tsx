import { Route, Switch } from 'react-router-dom';
import React from 'react';
import HomePage from 'components/Pages/HomePage/HomePage';
import CatalogPage from 'components/Pages/CatalogPage/CatalogPage';
import AboutPage from 'components/Pages/AboutPage/AboutPage';
import './App.module.less';

const App = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={HomePage} />
      <Route path="/catalog" component={CatalogPage} />
      <Route path="/about" component={AboutPage} />
    </Switch>
  );
};

export default App;
