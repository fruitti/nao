/* eslint-disable */
import { createSelector } from 'reselect';
import { isUndefined, isNull, filter, forEach } from 'lodash';
const getUsers = (state) => state.entities.users;
const getUserConnected = (state) => state.user;
const getFilter = (state) => state.app.filter;

export default createSelector(
  [getFilter,getUsers,getUserConnected],
  (searchFilter,users,userConnected) => {
    let result = [];
    forEach(users, (user) => {
      if (user.username && user.username.includes(searchFilter) && user.username != userConnected.data.username) {
        result.push(user);
      }
    });
    return result;
  }
);