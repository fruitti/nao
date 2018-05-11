import filter from 'lodash/filter';

import {
  NOTIFICATION_ADD,
  NOTIFICATION_DELETE
} from '../actions';

const initialState = [];

export default function (state = initialState, action) {

  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = [...state];

  switch (action.type) {

    case NOTIFICATION_DELETE:
      nextState = filter(nextState, o => o.id !== action.payload.id);
      return nextState;

    case NOTIFICATION_ADD:
      nextState = [...nextState, action.payload];
      return nextState;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
