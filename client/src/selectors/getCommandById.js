/* eslint-disable */
import { createSelector } from 'reselect';
import { filter, head } from 'lodash';

const getCommands = (state) => state.entities.commands;

let getCommandById = (id) => {
  return createSelector(
    [getCommands],
    (commands) => {
      return head(filter(
        commands,
        (o) => o.id == id
      ));
    }
  );
};

export default getCommandById;
