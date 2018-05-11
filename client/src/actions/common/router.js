export const ROUTEUR_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export function setLocation(pathname) {
  return {
    type: ROUTEUR_LOCATION_CHANGE,
    payload: {
      pathname,
      query: {}
    }
  }
}
