/* eslint-disable */
import { createSelector } from 'reselect';
import { isUndefined, isNull, filter, forEach } from 'lodash';
const getCommands = (state) => state.entities.commands;
const getFilter = (state) => state.app.filter;

let getCommandByRobotId = (id) => {
  return createSelector(
    [getFilter,getCommands],
    (searchFilter,commands) => {
      let result = [];
      forEach(commands, (command) => {
        if (command.id_robot == id && (command.name && command.name.includes(searchFilter) || command.action && command.action.includes(searchFilter) || command.description && command.description.includes(searchFilter))) {
          result.push(command);
        }
      });
      return result;
    }
  );
};

export default getCommandByRobotId;