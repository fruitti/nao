import {
  LOGIN_CONNECT_OK,
  LOGIN_DISCONNECT
} from '../actions';

const initialState = {
  data: null,
  token: null
};

export default function (state = initialState, action) {

  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = {...state};

  switch (action.type) {

    case LOGIN_CONNECT_OK:
      nextState.data = action.payload.user;
      nextState.token = action.payload.token;
      return nextState;

    case LOGIN_DISCONNECT:
      nextState.data = null;
      nextState.token = null;
      return nextState;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
