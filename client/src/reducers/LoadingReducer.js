import {
  LOADING_SET_LOADING
} from '../actions';

const initialState = false;

export default function (state = initialState, action) {

  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = {...state};

  switch (action.type) {

    case LOADING_SET_LOADING:
      nextState = action.payload;
      return nextState;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
