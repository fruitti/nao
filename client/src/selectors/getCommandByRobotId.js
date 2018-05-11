/* eslint-disable */
import { createSelector } from 'reselect';
import { filter, head } from 'lodash';

const getCommands = (state) => state.entities.commands;

let getCommandByIdRobot = (id) => {
  return createSelector(
    [getCommands],
    (commands) => {
       let test = filter(
        commands,
        (o) => o.id_robot == id
      );
      return test;
    }
  );
};

export default getCommandByIdRobot;
