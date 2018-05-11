export const FILTER_SET = 'FILTER_SET';

export function set(payload) {
  return {
    type: FILTER_SET,
    payload
  }
}
