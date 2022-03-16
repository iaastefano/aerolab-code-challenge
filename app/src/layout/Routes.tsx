import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ClientResourcesEnum from '../config/client';
import HomePage from '../pages/Home/HomePage';

interface RoutesProps {}

const Routes: React.FunctionComponent<RoutesProps> = () => (
  <BrowserRouter>
    <Switch>
      <Route component={HomePage} path={ClientResourcesEnum.ROOT}/>
    </Switch>
  </BrowserRouter>
);

export default Routes;
