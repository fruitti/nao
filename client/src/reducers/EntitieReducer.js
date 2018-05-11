import {
  ROBOT_GET_RECIEVE,
  ROBOT_RESET,
  
  PERIPHERAL_GET_RECIEVE,
  PERIPHERAL_RESET,
  
  COMMAND_GET_RECIEVE,
  COMMAND_RESET,
  
  USER_GET_RECIEVE,
  USER_RESET,
  
  NAO_GET_BEHAVIOR_LIST_RECIEVE
} from '../actions';

const initialState = {
  robots: {},
  peripherals: {},
  commands: {},
  users: {},
  behaviorList: {}
};

export default function (state = initialState, action) {

  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = {...state};

  switch (action.type) {

    case ROBOT_GET_RECIEVE:
      nextState.robots = action.payload.robots;
      return nextState;
      break;
      
    case ROBOT_RESET:
      nextState.robots = {};
      return nextState;
      break;
  
    case PERIPHERAL_GET_RECIEVE:
      nextState.peripherals = action.payload.peripherals;
      return nextState;
      break;
  
    case PERIPHERAL_RESET:
      nextState.peripherals = {};
      return nextState;
      break;
      
    case COMMAND_GET_RECIEVE:
      nextState.commands = action.payload.commands;
      return nextState;
      break;
  
    case COMMAND_RESET:
      nextState.commands = {};
      return nextState;
      break;
      
    case USER_GET_RECIEVE:
      nextState.users = action.payload.users;
      return nextState;
      break;
  
    case NAO_GET_BEHAVIOR_LIST_RECIEVE:
      nextState.behaviorList = action.payload;
      return nextState;
      break;
  
    case USER_RESET:
      nextState.users = {};
      return nextState;
      break;
    
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};
