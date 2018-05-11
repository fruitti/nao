export const BEHAVIOR_PROGRESS_SET_LOADING = 'BEHAVIOR_PROGRESS_SET_LOADING';

export function setLoading(payload) {
  return {
    type: BEHAVIOR_PROGRESS_SET_LOADING,
    payload
  }
}
