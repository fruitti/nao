import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { isEmpty, isUndefined, values, isNull } from 'lodash';

import Nao from '../services/naoClass';

import {
  NAO_CONNECT,
  NAO_VERSION,
  NAO_SAY,
  NAO_MOVE,
  NAO_MOVE_HEAD,
  NAO_BEHAVIOR,
  NAO_RASTA,
  NAO_GET_BEHAVIOR_LIST,
  NAO_GET_BEHAVIOR_LIST_RECIEVE,
  NAO_SET_BATTERY_CHARGE,
  NAO_GET_BATTERY,
  NAO_SET_SYSTEM_VERSION,
  NAO_STOP_ALL_BEHAVIOR,
  NAO_SHUTDOWN,
  
  NOTIFICATION_ADD,
  BEHAVIOR_PROGRESS_SET_LOADING,
  LOADING_SET_LOADING
} from '../actions';

function * connect(action) {
  try {
    // ip null ou undefined ou vide
    if (isUndefined(action.payload) || isEmpty(action.payload) || isNull(action.payload)) {
      throw new Error('L\'ip du robot est invalide :/\n Il sera impossible d\'ajouter des commandes !')
    }
    
    yield put({type: LOADING_SET_LOADING, payload: true});
    
    let data = yield call(Nao.init, action.payload + ':80');
    
    // erreur de connexion
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    
    // get battery
    let battery = yield call(Nao.getBatteryCharge, null);
    yield put({type: NAO_SET_BATTERY_CHARGE, payload: battery.toString()});
  
    let version = yield call(Nao.getSystemVersion, null);
    yield put({type: NAO_SET_SYSTEM_VERSION, payload: version.toString()});
    
    yield put({type: LOADING_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: LOADING_SET_LOADING, payload: false});
    if (e.message != 'Deja connecté') {
      yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message: e.message, type: 'negative'}});
    }
  }
}

function * version() {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.getSystemVersion, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  }
}

function * say(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.say, action.payload);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  }
}

function * rasta(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.rasta, action.payload);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  }
}

function * behavior(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.behavior, action.payload);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * behaviorList() {
  try {
    let data = yield call(Nao.behaviorList, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_GET_BEHAVIOR_LIST_RECIEVE, payload: data});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * stopAllBehavior() {
  try {
    let data = yield call(Nao.stopAllBehavior, null);
    yield call (Nao.behavior, 'debout/behavior_1');
    if (data.hasOwnProperty('error')) throw new Error(data.error);
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * move(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.move, action.payload.x, action.payload.y, action.payload.theta);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * moveHead(action) {
  try {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: true});
    let data = yield call(Nao.moveHead, action.payload.mode, action.payload.x, action.payload.y);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
  } catch (e) {
    yield put({type: BEHAVIOR_PROGRESS_SET_LOADING, payload: false});
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * getBattery() {
  try {
    let data = yield call(Nao.getBatteryCharge, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
    yield put({type: NAO_SET_BATTERY_CHARGE, payload: data.toString()});
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * shutdown() {
  try {
    let data = yield call(Nao.shutdown, null);
    if (data.hasOwnProperty('error')) throw new Error(data.error);
  } catch (e) {
    yield put({type: NOTIFICATION_ADD, payload: {id: Math.random(), message : e.message, type : 'negative'}});
  }
}

function * NaoSaga() {
  yield [
    takeLatest(NAO_CONNECT, connect),
    takeLatest(NAO_VERSION, version),
    takeLatest(NAO_SAY, say),
    takeLatest(NAO_BEHAVIOR, behavior),
    takeLatest(NAO_RASTA, rasta),
    takeLatest(NAO_GET_BEHAVIOR_LIST, behaviorList),
    takeLatest(NAO_STOP_ALL_BEHAVIOR, stopAllBehavior),
    takeLatest(NAO_MOVE, move),
    takeLatest(NAO_MOVE_HEAD, moveHead),
    takeLatest(NAO_GET_BATTERY, getBattery),
    takeLatest(NAO_SHUTDOWN, shutdown),
  ];
}

export default NaoSaga;
