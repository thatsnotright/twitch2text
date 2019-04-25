import { FETCH_FAILURE, FETCH_SUCCESS } from './actionTypes';

const initialState = {
  users: [],
  clips: [],
};


export default function clipsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_FAILURE:
      return state;
    case FETCH_SUCCESS: {
      const { dataType, data } = payload;
      return { ...state, [dataType]: data };
    }
    default:
      return state;
  }
}
