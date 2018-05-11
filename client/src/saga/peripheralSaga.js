import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { isEmpty, isUndefined, filter, first } from 'lodash';
import { normalize } from 'normalizr';

import apiClass from '../services/apiClass';
import { peripheralSchema } from '../normalizers';

import {
  PERIPHERAL_RESET,
  
  PERIPHERAL_UPDATE,
  PERIPHERAL_UPDATE_RECIEVE,
  
  PERIPHERAL_GET,
  PERIPHERAL_GET_RECIEVE,
  
  PERIPHERAL_DELETE,
  PERIPHERAL_DELETE_RECIEVE,
  
  PERIPHERAL_CREATE,
  PERIPHERAL_CREATE_RECIEVE,
  
  ROUTEUR_LOCATION_CHANGE,
  LOADING_SET_LOADING,
  NOTIFICATION_ADD,
  // NAO_CONNECT
} from '../actions';

function * createPeripheral(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.createPeripheral(action.payload));
    
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: PERIPHERAL_GET});
    yield put({type: PERIPHERAL_CREATE_RECIEVE});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * createPeripheralRecieve(){
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/peripheral', query: {}}});
}

function * getPeripheral() {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    
    // reset PERIPHERAL
    yield put({type: PERIPHERAL_RESET});
    
    let data = yield call(apiClass.getPeripheral());
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    const dataNormalizr = normalize(data, [peripheralSchema]);
    yield put({type: PERIPHERAL_GET_RECIEVE, payload: dataNormalizr.entities});
    
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * updatePeripheral(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.updatePeripheral(action.payload));
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: PERIPHERAL_GET});
    yield put({type: PERIPHERAL_UPDATE_RECIEVE});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * updatePeripheralRecieve() {
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/peripheral', query: {}}});
}

function * deletePeripheral(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.deletePeripheral(action.payload));
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: PERIPHERAL_GET});
    yield put({type: PERIPHERAL_DELETE_RECIEVE});
    yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/peripheral', query: {}}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * deletePeripheralRecieve() {
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/peripheral', query: {}}});
}

function * PeripheralSaga() {
  yield [
    takeLatest(PERIPHERAL_CREATE, createPeripheral),
    takeLatest(PERIPHERAL_GET, getPeripheral),
    takeLatest(PERIPHERAL_UPDATE, updatePeripheral),
    takeLatest(PERIPHERAL_DELETE, deletePeripheral),
    
    takeLatest(PERIPHERAL_UPDATE_RECIEVE, updatePeripheralRecieve),
    takeLatest(PERIPHERAL_DELETE_RECIEVE, deletePeripheralRecieve),
    takeLatest(PERIPHERAL_CREATE_RECIEVE, createPeripheralRecieve),
  ];
}

export default PeripheralSaga;
