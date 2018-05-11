export const NOTIFICATION_ADD = 'NOTIFICATION_ADD';
export const NOTIFICATION_DELETE = 'NOTIFICATION_DELETE';

export function add(payload) {
  return {
    type: NOTIFICATION_ADD,
    payload
  }
}

export function ddelete(payload) {
  return {
    type: NOTIFICATION_DELETE,
    payload
  }
}
