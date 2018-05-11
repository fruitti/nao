export {
  // ACTION
  ROUTEUR_LOCATION_CHANGE,

  // ACTION CREATOR
  setLocation as RouterSetLocation,
} from './common/router';

export {
  // ACTION
  FILTER_SET,
  
  // ACTION CREATOR
  set as FilterSet,
} from './common/filter';

export {
  // ACTION
  LOGIN_TOKEN,
  LOGIN_CONNECT,
  LOGIN_CONNECT_OK,
  LOGIN_DISCONNECT,

  // ACTION CREATOR
  token as LoginToken,
  connect as LoginConnect,
  disconnect as LoginDisconnect,
} from './common/login';

export {
  // ACTION
  LOADING_SET_LOADING,

  // ACTION CREATOR
  setLoading as LoadingSetLoading,
} from './common/loading';

export {
  // ACTION
  BEHAVIOR_PROGRESS_SET_LOADING,
  
  // ACTION CREATOR
  setLoading as BehaviorSetLoading,
} from './common/behaviorInProgress';

export {
  // ACTION
  NOTIFICATION_ADD,
  NOTIFICATION_DELETE,

  // ACTION CREATOR
  add as NotificationAdd,
  ddelete as NotificationDelete,
} from './common/notification';

export {
  // ACTION
  MODE_SET,
  
  // ACTION CREATOR
  set as ModeSet
} from './common/mode';

export {
  // ACTION
  NAO_CONNECT,
  NAO_VERSION,
  NAO_SAY,
  NAO_BEHAVIOR,
  NAO_RASTA,
  NAO_GET_BEHAVIOR_LIST,
  NAO_GET_BEHAVIOR_LIST_RECIEVE,
  NAO_GET_DATA,
  NAO_GET_DATA_RECIEVE,
  NAO_SET_BATTERY_CHARGE,
  NAO_SET_SYSTEM_VERSION,
  NAO_STOP_ALL_BEHAVIOR,
  NAO_MOVE,
  NAO_MOVE_HEAD,
  NAO_GET_BATTERY,
  NAO_GET_BATTERY_RECIEVE,
  NAO_SHUTDOWN,
  
  // ACTION CREATOR
  connect as NaoConnect,
  version as NaoGetVersion,
  textToSay as NaoSay,
  behavior as NaoBehavior,
  rasta as NaoRasta,
  behaviorList as NaobehaviorList,
  data as NaoData,
  setBattery as NaoSetBattery,
  setSystemVersion as NaoSetSystemVersion,
  stopAllBehavior as NaoStopAllBehavior,
  move as NaoMove,
  moveHead as NaoMoveHead,
  getBattery as NaoGetBattery,
  shutdown as NaoShutdown
} from './common/nao';

export {
  // ACTION
  ROBOT_RESET,
  
  ROBOT_GET,
  ROBOT_GET_RECIEVE,
  
  ROBOT_UPDATE,
  ROBOT_UPDATE_RECIEVE,
  
  ROBOT_CREATE,
  ROBOT_CREATE_RECIEVE,
  
  ROBOT_DELETE,
  ROBOT_DELETE_RECIEVE,
  
  ROBOT_SET_DEFAULT,
  
  
  // ACTION CREATOR
  update as RobotUpdate,
  get as RobotGet,
  create as RobotCreate,
  deleteR as RobotDelete,
  defaultR as RobotDefault,
} from './back/robot';

export {
  // ACTION
  PERIPHERAL_RESET,
  
  PERIPHERAL_GET,
  PERIPHERAL_GET_RECIEVE,
  
  PERIPHERAL_UPDATE,
  PERIPHERAL_UPDATE_RECIEVE,
  
  PERIPHERAL_CREATE,
  PERIPHERAL_CREATE_RECIEVE,
  
  PERIPHERAL_DELETE,
  PERIPHERAL_DELETE_RECIEVE,
  
  // ACTION CREATOR
  update as PeripheralUpdate,
  get as PeripheralGet,
  create as PeripheralCreate,
  deleteP as PeripheralDelete,
} from './back/peripheral';

export {
  // ACTION
  COMMAND_RESET,
  
  COMMAND_GET,
  COMMAND_GET_RECIEVE,
  
  COMMAND_UPDATE,
  COMMAND_UPDATE_RECIEVE,
  
  COMMAND_CREATE,
  COMMAND_CREATE_RECIEVE,
  
  COMMAND_DELETE,
  COMMAND_DELETE_RECIEVE,
  
  // ACTION CREATOR
  update as CommandUpdate,
  get as CommandGet,
  create as CommandCreate,
  deleteC as CommandDelete
} from './back/command';


export {
  // ACTION
  USER_RESET,
  
  USER_GET,
  USER_GET_RECIEVE,
  
  USER_UPDATE,
  USER_UPDATE_RECIEVE,
  
  USER_CREATE,
  USER_CREATE_RECIEVE,
  
  USER_DELETE,
  USER_DELETE_RECIEVE,
  
  // ACTION CREATOR
  update as UserUpdate,
  get as UserGet,
  create as UserCreate,
  deleteU as UserDelete,
} from './back/user';