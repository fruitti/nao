import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { isEmpty, isUndefined, filter, first } from 'lodash';
import { normalize } from 'normalizr';

import apiClass from '../services/apiClass';
import { userSchema } from '../normalizers';

import {
  USER_RESET,
  
  USER_UPDATE,
  USER_UPDATE_RECIEVE,
  
  USER_GET,
  USER_GET_RECIEVE,
  
  USER_DELETE,
  USER_DELETE_RECIEVE,
  
  USER_CREATE,
  USER_CREATE_RECIEVE,
  
  ROUTEUR_LOCATION_CHANGE,
  LOADING_SET_LOADING,
  NOTIFICATION_ADD,
  // NAO_CONNECT
} from '../actions';

function * createUser(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.createUser(action.payload));
    
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: USER_GET});
    yield put({type: USER_CREATE_RECIEVE});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * createUserRecieve(){
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/user', query: {}}});
}

function * getUser() {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    
    // reset user
    yield put({type: USER_RESET});
    
    let data = yield call(apiClass.getUser());
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    const dataNormalizr = normalize(data, [userSchema]);
    yield put({type: USER_GET_RECIEVE, payload: dataNormalizr.entities});
    
    // let defaultUser = first(filter(dataNormalizr.entities.users, (o) => +o.default > 0));
    // yield put({type: NAO_CONNECT, payload: defaultUser.ip_address});
    
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * updateUser(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.updateUser(action.payload));
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: USER_GET});
    yield put({type: USER_UPDATE_RECIEVE});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * updateUserRecieve() {
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/user', query: {}}});
}

function * deleteUser(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.deleteUser(action.payload));
  
    if (data.hasOwnProperty('error')) {
      throw new Error(data.error);
    }
    
    yield put({type: USER_GET});
    yield put({type: USER_DELETE_RECIEVE});
    yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/user', query: {}}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * deleteUserRecieve() {
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin/user', query: {}}});
}

function * userSaga() {
  yield [
    takeLatest(USER_CREATE, createUser),
    takeLatest(USER_GET, getUser),
    takeLatest(USER_UPDATE, updateUser),
    takeLatest(USER_DELETE, deleteUser),
    
    takeLatest(USER_UPDATE_RECIEVE, updateUserRecieve),
    takeLatest(USER_DELETE_RECIEVE, deleteUserRecieve),
    takeLatest(USER_CREATE_RECIEVE, createUserRecieve),
  ];
}

export default userSaga;
