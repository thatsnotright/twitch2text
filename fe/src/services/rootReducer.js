import combineReducers from 'combine-reducers-global-state';
import clipsReducer from './clips/reducer';

const createRootReducer = () => {
  return combineReducers({
    clips: clipsReducer,
  });
}

export { createRootReducer };