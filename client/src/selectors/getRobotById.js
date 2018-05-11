/* eslint-disable */
import { createSelector } from 'reselect';
import { filter, head } from 'lodash';

const getRobots = (state) => state.entities.robots;

let getRobotById = (id) => {
  return createSelector(
    [getRobots],
    (robots) => {
      return head(filter(
        robots,
        (o) => o.id == id
      ));
    }
  );
};

export default getRobotById;
