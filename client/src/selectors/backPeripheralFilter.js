/* eslint-disable */
import { createSelector } from 'reselect';
import { isUndefined, isNull, filter, forEach } from 'lodash';
const getPeripherals = (state) => state.entities.peripherals;
const getFilter = (state) => state.app.filter;

export default createSelector(
  [getFilter,getPeripherals],
  (searchFilter,peripherals) => {
    let result = [];
    forEach(peripherals, (peripheral) => {
      if (
        peripheral.name && peripheral.name.includes(searchFilter) ||
        peripheral.ip_address && peripheral.ip_address.includes(searchFilter) ||
        peripheral.mac_address && peripheral.mac_address.includes(searchFilter) ||
        peripheral.description && peripheral.description.includes(searchFilter)
      ) {
        result.push(peripheral);
      }
    });
    return result;
  }
);