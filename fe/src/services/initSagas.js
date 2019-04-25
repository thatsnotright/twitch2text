import * as sagas from './sagas';

const initSagas = (sagaMiddleware) => {
  const run = sagaMiddleware.run.bind(sagaMiddleware);
  Object.values(sagas).forEach(run);
}

export { initSagas };