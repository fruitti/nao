/* eslint-disable */
import { createSelector } from 'reselect';
import { filter, head } from 'lodash';

const getUsers = (state) => state.entities.users;

let getUserById = (id) => {
  return createSelector(
    [getUsers],
    (users) => {
      return head(filter(
        users,
        (o) => o.id == id
      ));
    }
  );
};

export default getUserById;
