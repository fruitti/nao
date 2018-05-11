import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import moment from '../utils/moment';
import { isEmpty, isUndefined, isNull } from 'lodash';

import apiClass from '../services/apiClass';

import {
  ROUTEUR_LOCATION_CHANGE,
  LOGIN_TOKEN,
  LOGIN_CONNECT,
  LOGIN_CONNECT_OK,
  LOGIN_DISCONNECT,
  LOADING_SET_LOADING,
  NOTIFICATION_ADD
} from '../actions';

function * login(action) {
  try {
    yield put({type: LOADING_SET_LOADING, payload: true});
    let data = yield call(apiClass.authRequest(action.payload));
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    
    if (action.payload.rememberMe) {
      localStorage.setItem('nao', JSON.stringify(data));
    }

    // set token
    apiClass.setToken(data.token);
    
    yield put({type: LOGIN_CONNECT_OK, payload: data});
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : 'Connecté', type : 'positive'}});
    yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin', query: {}}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (error) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
    yield put({type: LOADING_SET_LOADING, payload: false});
  }
}

function * token(action) {
    try {
      yield put({type: LOADING_SET_LOADING, payload: true});
      let data = JSON.parse(localStorage.getItem('nao'));
      
      if (!isNull(data) && data.hasOwnProperty('token') && moment().isBefore(moment(Number(jwtDecode(data.token).exp + '000')))) {
        apiClass.setToken(data.token);
        yield put({type: LOGIN_CONNECT_OK, payload: data});
      }
      
      if (!isNull(apiClass.getToken()) &&  !isUndefined(apiClass.getToken()) &&  moment().isBefore(moment(Number(jwtDecode(apiClass.getToken()).exp + '000')))) {
        // TODO rediriger que si l'url d'arriver est different de admin
        //   yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/admin', query: {}}});
      } else {
        localStorage.removeItem('nao');
        apiClass.setToken(null);
        yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/login', query: {}}});
      }
      yield put({type: LOADING_SET_LOADING, payload: false});
    } catch (error) {
      yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : error.message, type : 'negative'}});
      yield put({type: LOADING_SET_LOADING, payload: false});
    }
}

function * disconnect() {
  // tcheck id token exist and delete it
  if (localStorage.getItem('nao')) {
    localStorage.removeItem('nao');
  }
  // delete
  apiClass.setToken(undefined);
  
  // redirect
  yield put({type: ROUTEUR_LOCATION_CHANGE, payload: {pathname: '/login', query: {}}});
}

function * LoginSaga() {
  yield [
    takeLatest(LOGIN_CONNECT, login),
    takeLatest(LOGIN_TOKEN, token),
    takeLatest(LOGIN_DISCONNECT, disconnect)
  ];
}

export default LoginSaga;
