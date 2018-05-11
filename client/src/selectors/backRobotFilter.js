/* eslint-disable */
import { createSelector } from 'reselect';
import { isUndefined, isNull, filter, forEach } from 'lodash';
const getRobots = (state) => state.entities.robots;
const getFilter = (state) => state.app.filter;

export default createSelector(
  [getFilter,getRobots],
  (searchFilter,robots) => {
    let result = [];
    forEach(robots, (robot) => {
      if (
        robot.name && robot.name.includes(searchFilter) ||
        robot.ip_address && robot.ip_address.includes(searchFilter) ||
        robot.mac_address && robot.mac_address.includes(searchFilter) ||
        robot.description && robot.description.includes(searchFilter)
      ) {
        result.push(robot);
      }
    });
    return result;
  }
);