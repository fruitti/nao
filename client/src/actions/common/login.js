export const LOGIN_TOKEN = 'LOGIN_TOKEN';
export const LOGIN_CONNECT = 'LOGIN_CONNECT';
export const LOGIN_CONNECT_OK = 'LOGIN_CONNECT_OK';
export const LOGIN_DISCONNECT = 'LOGIN_DISCONNECT';

export function connect(payload) {
  return {
    type: LOGIN_CONNECT,
    payload
  }
}

export function disconnect() {
  return {
    type: LOGIN_DISCONNECT
  }
}

export function token(payload) {
  return {
    type: LOGIN_TOKEN,
    payload
  }
}
