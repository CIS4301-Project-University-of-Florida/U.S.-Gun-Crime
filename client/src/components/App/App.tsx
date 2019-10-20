import { Route, Switch } from 'react-router-dom';
import React from 'react';
import HomePage from 'pages/HomePage/HomePage';
import CatalogPage from 'pages/CatalogPage/CatalogPage';
import AboutPage from 'pages/AboutPage/AboutPage';
import './App.module.less';

const App = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={HomePage} />
      <Route path="/data-catalog" component={CatalogPage} />
      <Route path="/about" component={AboutPage} />
    </Switch>
  );
};

export default App;
