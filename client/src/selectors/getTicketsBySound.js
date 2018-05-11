/* eslint-disable */
import { createSelector } from 'reselect';
import { filter } from 'lodash';

const getTickets = (state) => state.tickets;

export default  createSelector(
  [getTickets],
  (getTickets) => {
    return filter(getTickets, (o) => o.sound);
  }
);
