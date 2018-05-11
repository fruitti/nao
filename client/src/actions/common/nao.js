export const NAO_CONNECT = 'NAO_CONNECT';
export const NAO_VERSION = 'NAO_VERSION';
export const NAO_SAY = 'NAO_SAY';
export const NAO_BEHAVIOR = 'NAO_BEHAVIOR';
export const NAO_RASTA = 'NAO_RASTA';
export const NAO_GET_BEHAVIOR_LIST = 'NAO_GET_BEHAVIOR_LIST';
export const NAO_GET_BEHAVIOR_LIST_RECIEVE = 'NAO_GET_BEHAVIOR_LIST_RECIEVE';

export const NAO_SHUTDOWN = 'NAO_SHUTDOWN';

export const NAO_GET_BATTERY = 'NAO_GET_BATTERY';
export const NAO_GET_BATTERY_RECIEVE = 'NAO_GET_BATTERY_RECIEVE';

export const NAO_GET_DATA = 'NAO_GET_DATA';
export const NAO_GET_DATA_RECIEVE = 'NAO_GET_DATA_RECIEVE';

export const NAO_SET_BATTERY_CHARGE = 'NAO_SET_BATTERY_CHARGE';
export const NAO_SET_SYSTEM_VERSION = 'NAO_SET_SYSTEM_VERSION';

export const NAO_STOP_ALL_BEHAVIOR = 'NAO_STOP_ALL_BEHAVIOR';

export const NAO_MOVE = 'NAO_MOVE';
export const NAO_MOVE_HEAD = 'NAO_MOVE_HEAD';

export function connect(payload) {
  return {
    type: NAO_CONNECT,
    payload
  }
}

export function textToSay(payload) {
  return {
    type: NAO_SAY,
    payload
  }
}

export function version() {
  return {
    type: NAO_VERSION
  }
}

export function behavior(payload) {
  return {
    type: NAO_BEHAVIOR,
    payload
  }
}

export function rasta(payload) {
  return {
    type: NAO_RASTA,
    payload
  }
}

export function behaviorList() {
  return {
    type: NAO_GET_BEHAVIOR_LIST
  }
}

export function data(payload) {
  return {
    type: NAO_GET_DATA,
    payload
  }
}

export function setBattery(payload) {
  return {
    type: NAO_SET_BATTERY_CHARGE,
    payload
  }
}

export function setSystemVersion(payload) {
  return {
    type: NAO_SET_SYSTEM_VERSION,
    payload
  }
}

export function stopAllBehavior(payload) {
  return {
    type: NAO_STOP_ALL_BEHAVIOR,
    payload
  }
}

export function move(payload) {
  return {
    type: NAO_MOVE,
    payload
  }
}

export function moveHead(payload) {
  return {
    type: NAO_MOVE_HEAD,
    payload
  }
}

export function getBattery(payload) {
  return {
    type: NAO_GET_BATTERY,
    payload
  }
}

export function shutdown() {
  return {
    type: NAO_SHUTDOWN
  }
}