import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { isEmpty, isUndefined, filter, first } from 'lodash';
import { normalize } from 'normalizr';

import apiClass from '../services/apiClass';
import { robotSchema } from '../normalizers';

import {
  ROBOT_RESET,
  
  ROBOT_UPDATE,
  ROBOT_UPDATE_RECIEVE,
  
  ROBOT_GET,
  ROBOT_GET_RECIEVE,
  
  ROBOT_DELETE,
  ROBOT_DELETE_RECIEVE,
  
  ROBOT_CREATE,
  ROBOT_CREATE_RECIEVE,
  
  ROBOT_SET_DEFAULT,
  
  ROUTEUR_LOCATION_CHANGE,
  LOADING_SET_LOADING,
  NOTIFICATION_ADD,
  // NAO_CONNECT
} from '../actions';

function * createRobot(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.createRobot(action.payload));
    
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: ROBOT_GET});
    yield put({type: ROBOT_CREATE_RECIEVE});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * createRobotRecieve(){
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/robot', query: {}}});
}

function * getRobot() {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    
    // reset robot
    yield put({type: ROBOT_RESET});
    
    let data = yield call(apiClass.getRobot());
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    const dataNormalizr = normalize(data, [robotSchema]);
    yield put({type: ROBOT_GET_RECIEVE, payload: dataNormalizr.entities});
    
    let defaultRobot = first(filter(dataNormalizr.entities.robots, (o) => +o.default > 0));
    yield put({type: ROBOT_SET_DEFAULT, payload: defaultRobot.id});
    
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * updateRobot(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.updateRobot(action.payload));
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: ROBOT_GET});
    yield put({type: ROBOT_UPDATE_RECIEVE});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * updateRobotRecieve() {
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/robot', query: {}}});
}

function * deleteRobot(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.deleteRobot(action.payload));
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: ROBOT_GET});
    yield put({type: ROBOT_DELETE_RECIEVE});
    yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/robot', query: {}}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * deleteRobotRecieve() {
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/robot', query: {}}});
}

function * robotSaga() {
  yield [
    takeLatest(ROBOT_CREATE, createRobot),
    takeLatest(ROBOT_GET, getRobot),
    takeLatest(ROBOT_UPDATE, updateRobot),
    takeLatest(ROBOT_DELETE, deleteRobot),
    
    takeLatest(ROBOT_UPDATE_RECIEVE, updateRobotRecieve),
    takeLatest(ROBOT_DELETE_RECIEVE, deleteRobotRecieve),
    takeLatest(ROBOT_CREATE_RECIEVE, createRobotRecieve),
  ];
}

export default robotSaga;
