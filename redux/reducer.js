import {STORAGE_INIT, STORAGE_SYNC} from "./actions";

const initialState = {
  authors: {},
  books: {},
  storage: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case STORAGE_INIT:
      return {
        ...state,
        storage: payload,
      };
    case STORAGE_SYNC:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
