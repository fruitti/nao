import { combineReducers } from 'redux';

import user from './UserReducer';
import notifications from './NotificationReducer';
import loading from './LoadingReducer';
import app from './AppReducer';
import entities from './EntitieReducer';
import { routerReducer } from 'react-router-redux';

import { reducer as formReducer } from 'redux-form';

const reducers = {
  user,
  app,
  notifications,
  loading,
  routing: routerReducer,
  form: formReducer,
  entities
};

export default combineReducers(reducers);
