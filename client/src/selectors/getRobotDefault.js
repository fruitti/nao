/* eslint-disable */
import { createSelector } from 'reselect';
import { filter, first } from 'lodash';

const getRobots = (state) => state.entities.robots;
const getId = (state) => state.app.default;

export default  createSelector(
  [getId,getRobots],
  (getId,getRobots) => {
    return first(filter(getRobots, (o) => o.id === getId));
  }
);
