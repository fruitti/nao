export const MODE_SET = 'MODE_SET';

export function set(payload) {
  return {
    type: MODE_SET,
    payload
  }
}
