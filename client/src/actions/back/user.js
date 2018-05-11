export const USER_GET = 'USER_GET';
export const USER_GET_RECIEVE = 'USER_GET_RECIEVE';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATE_RECIEVE = 'USER_UPDATE_RECIEVE';
export const USER_CREATE = 'USER_CREATE';
export const USER_CREATE_RECIEVE = 'USER_CREATE_RECIEVE';
export const USER_DELETE = 'USER_DELETE';
export const USER_DELETE_RECIEVE = 'USER_DELETE_RECIEVE';
export const USER_RESET = 'USER_RESET';

export function update(payload) {
  return {
    type: USER_UPDATE,
    payload
  }
}

export function get() {
  return {
    type: USER_GET
  }
}

export function deleteU(payload) {
  return {
    type: USER_DELETE,
    payload
  }
}

export function create(payload) {
  return {
    type: USER_CREATE,
    payload
  }
}