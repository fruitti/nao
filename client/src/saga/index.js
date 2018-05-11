import { fork } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import naoSaga from './NaoSaga';

import robotSaga from './robotSaga';
import peripheralSaga from './peripheralSaga';
import commandSaga from './commandSaga';
import userSaga from './userSaga';

export default function* root() {
  yield [
    fork(loginSaga),
    fork(naoSaga),
    fork(robotSaga),
    fork(commandSaga),
    fork(userSaga),
    fork(peripheralSaga)
  ];
}
