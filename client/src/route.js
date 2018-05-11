import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './stores';

import Login from './containers/layout/login';

import LayoutFront from './containers/layout/front';
import Main from './containers/front/home';
import Doc from './containers/front/doc';

import LayoutBack from './containers/layout/back';
import MainBack from './containers/back';

import RobotHome from './containers/back/robot/home';
import RobotCreate from './containers/back/robot/create';
import RobotUpdate from './containers/back/robot/update';
import RobotDelete from './containers/back/robot/delete';

import PeripheralHome from './containers/back/peripheral/home';
import PeripheralCreate from './containers/back/peripheral/create';
import PeripheralUpdate from './containers/back/peripheral/update';
import PeripheralDelete from './containers/back/peripheral/delete';

import CommandHome from './containers/back/command/home';
import CommandCreate from './containers/back/command/create';
import CommandUpdate from './containers/back/command/update';
import CommandDelete from './containers/back/command/delete';

import UserHome from './containers/back/user/home';
import UserCreate from './containers/back/user/create';
import UserDelete from './containers/back/user/delete';

const store = configureStore();
const historyOk = syncHistoryWithStore(hashHistory, store);

import 'react-table/react-table.css';
import './assets/style/app.css';

class RouteComponent extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <Router history={historyOk}>
          <Route path="/" component={LayoutFront} >
            <IndexRoute component={Main} />
            <Route path="/home" component={Main} />
            <Route path="/doc" component={Doc} />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={LayoutBack} >
            <IndexRoute component={MainBack} />
            
            <Route path="robot" component={RobotHome} />
            <Route path="robot/create" component={RobotCreate} />
            <Route path="robot/update/:id" component={RobotUpdate} />
            <Route path="robot/delete/:id" component={RobotDelete} />
            <Route path="robot/:idRobot/command" component={CommandHome} />
            <Route path="robot/:idRobot/command/create" component={CommandCreate} />
            <Route path="robot/:idRobot/command/update/:id" component={CommandUpdate} />
            <Route path="robot/:idRobot/command/delete/:id" component={CommandDelete} />
            
            <Route path="peripheral" component={PeripheralHome} />
            <Route path="peripheral/create" component={PeripheralCreate} />
            <Route path="peripheral/update/:id" component={PeripheralUpdate} />
            <Route path="peripheral/delete/:id" component={PeripheralDelete} />
  
            <Route path="user" component={UserHome} />
            <Route path="user/create" component={UserCreate} />
            <Route path="user/delete/:id" component={UserDelete} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

RouteComponent.propTypes = {};

export default RouteComponent;
