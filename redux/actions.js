export const STORAGE_INIT = "STORAGE_INIT";
export const STORAGE_SYNC = "STORAGE_SYNC";

export function initStorage(instance) {
  return function carry(dispatch) {
    return dispatch({ type: STORAGE_INIT, payload: instance });
  };
}

export function syncStorage(data) {
  return function carry(dispatch) {
    return dispatch({ type: STORAGE_SYNC, payload: data });
  };
}
