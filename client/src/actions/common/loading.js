export const LOADING_SET_LOADING = 'LOADING_SET_LOADING';

export function setLoading(payload) {
  return {
    type: LOADING_SET_LOADING,
    payload
  }
}
