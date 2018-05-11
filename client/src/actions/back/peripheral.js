export const PERIPHERAL_GET = 'PERIPHERAL_GET';
export const PERIPHERAL_GET_RECIEVE = 'PERIPHERAL_GET_RECIEVE';
export const PERIPHERAL_UPDATE = 'PERIPHERAL_UPDATE';
export const PERIPHERAL_UPDATE_RECIEVE = 'PERIPHERAL_UPDATE_RECIEVE';
export const PERIPHERAL_CREATE = 'PERIPHERAL_CREATE';
export const PERIPHERAL_CREATE_RECIEVE = 'PERIPHERAL_CREATE_RECIEVE';
export const PERIPHERAL_DELETE = 'PERIPHERAL_DELETE';
export const PERIPHERAL_DELETE_RECIEVE = 'PERIPHERAL_DELETE_RECIEVE';
export const PERIPHERAL_RESET = 'PERIPHERAL_RESET';

export function update(payload) {
  return {
    type: PERIPHERAL_UPDATE,
    payload
  }
}

export function get() {
  return {
    type: PERIPHERAL_GET
  }
}

export function deleteP(payload) {
  return {
    type: PERIPHERAL_DELETE,
    payload
  }
}

export function create(payload) {
  return {
    type: PERIPHERAL_CREATE,
    payload
  }
}