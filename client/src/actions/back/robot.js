export const ROBOT_GET = 'ROBOT_GET';
export const ROBOT_GET_RECIEVE = 'ROBOT_GET_RECIEVE';
export const ROBOT_UPDATE = 'ROBOT_UPDATE';
export const ROBOT_UPDATE_RECIEVE = 'ROBOT_UPDATE_RECIEVE';
export const ROBOT_CREATE = 'ROBOT_CREATE';
export const ROBOT_CREATE_RECIEVE = 'ROBOT_CREATE_RECIEVE';
export const ROBOT_DELETE = 'ROBOT_DELETE';
export const ROBOT_DELETE_RECIEVE = 'ROBOT_DELETE_RECIEVE';
export const ROBOT_RESET = 'ROBOT_RESET';
export const ROBOT_SET_DEFAULT = 'ROBOT_SET_DEFAULT';

export function update(payload) {
  return {
    type: ROBOT_UPDATE,
    payload
  }
}

export function get() {
  return {
    type: ROBOT_GET
  }
}

export function deleteR(payload) {
  return {
    type: ROBOT_DELETE,
    payload
  }
}

export function create(payload) {
  return {
    type: ROBOT_CREATE,
    payload
  }
}


export function defaultR(payload) {
  return {
    type: ROBOT_SET_DEFAULT,
    payload
  }
}