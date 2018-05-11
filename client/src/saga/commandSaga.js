import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { isEmpty, isUndefined, filter, first } from 'lodash';
import { normalize } from 'normalizr';

import apiClass from '../services/apiClass';
import { commandSchema } from '../normalizers';

import {
  COMMAND_RESET,
  
  COMMAND_UPDATE,
  COMMAND_UPDATE_RECIEVE,
  
  COMMAND_GET,
  COMMAND_GET_RECIEVE,
  
  COMMAND_DELETE,
  COMMAND_DELETE_RECIEVE,
  
  COMMAND_CREATE,
  COMMAND_CREATE_RECIEVE,
  
  ROUTEUR_LOCATION_CHANGE,
  LOADING_SET_LOADING,
  NOTIFICATION_ADD,
  // NAO_CONNECT
} from '../actions';

function * createCommand(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.createCommand(action.payload));
    
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: COMMAND_GET});
    yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: `/admin/robot/${action.payload.id_robot}/command`, query: {}}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * getCommand() {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    
    // reset robot
    yield put({type: COMMAND_RESET});
    
    let data = yield call(apiClass.getCommand());
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    const dataNormalizr = normalize(data, [commandSchema]);
    yield put({type: COMMAND_GET_RECIEVE, payload: dataNormalizr.entities});
    
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * updateCommand(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.updateCommand(action.payload));
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: COMMAND_GET});
    yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: `/admin/robot/${action.payload.id_robot}/command`, query: {}}});
    
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * deleteCommand(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.deleteCommand(action.payload.id));
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: COMMAND_GET});
    yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: `/admin/robot/${action.payload.idRobot}/command`, query: {}}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * CommandSaga() {
  yield [
    takeLatest(COMMAND_CREATE, createCommand),
    takeLatest(COMMAND_GET, getCommand),
    takeLatest(COMMAND_UPDATE, updateCommand),
    takeLatest(COMMAND_DELETE, deleteCommand)
  ];
}

export default CommandSaga;
