import {
  FILTER_SET,
  MODE_SET,
  ROBOT_SET_DEFAULT,
  BEHAVIOR_PROGRESS_SET_LOADING,
  
  NAO_SET_BATTERY_CHARGE,
  NAO_SET_SYSTEM_VERSION,
} from '../actions';

const initialState = {
  filter: '',
  mode: 'action', // pas or action etc
  default: null,
  nao: {
    battery: '0',
    version : 'none',
    processing: false
  }
};

export default function (state = initialState, action) {

  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = {...state};

  switch (action.type) {
    
    case FILTER_SET:
      nextState.filter = action.payload;
      return nextState;
      break;
      
    case MODE_SET:
      nextState.mode = action.payload;
      return nextState;
      break;
      
    case ROBOT_SET_DEFAULT:
      nextState.default = action.payload;
      return nextState;
      break;
      
    case NAO_SET_BATTERY_CHARGE:
      nextState.nao.battery = action.payload;
      return nextState;
      break;
  
    case NAO_SET_SYSTEM_VERSION:
      nextState.nao.version = action.payload;
      return nextState;
      break;
      
    case BEHAVIOR_PROGRESS_SET_LOADING:
      nextState.nao.processing = action.payload;
      return nextState;
      break;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
