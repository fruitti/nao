/* eslint-disable */
import { createSelector } from 'reselect';
import { filter, head } from 'lodash';

const getPeripherals = (state) => state.entities.peripherals;

let getPeripheralById = (id) => {
  return createSelector(
    [getPeripherals],
    (peripherals) => {
      return head(filter(
        peripherals,
        (o) => o.id == id
      ));
    }
  );
};

export default getPeripheralById;
