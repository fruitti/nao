export const COMMAND_GET = 'COMMAND_GET';
export const COMMAND_GET_RECIEVE = 'COMMAND_GET_RECIEVE';
export const COMMAND_UPDATE = 'COMMAND_UPDATE';
export const COMMAND_UPDATE_RECIEVE = 'COMMAND_UPDATE_RECIEVE';
export const COMMAND_CREATE = 'COMMAND_CREATE';
export const COMMAND_CREATE_RECIEVE = 'COMMAND_CREATE_RECIEVE';
export const COMMAND_DELETE = 'COMMAND_DELETE';
export const COMMAND_DELETE_RECIEVE = 'COMMAND_DELETE_RECIEVE';
export const COMMAND_RESET = 'COMMAND_RESET';

export function update(payload) {
  return {
    type: COMMAND_UPDATE,
    payload
  }
}

export function get() {
  return {
    type: COMMAND_GET
  }
}

export function deleteC(payload) {
  return {
    type: COMMAND_DELETE,
    payload
  }
}

export function create(payload) {
  return {
    type: COMMAND_CREATE,
    payload
  }
}