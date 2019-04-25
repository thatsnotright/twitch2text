import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  FETCH_USERS,
  FETCH_CLIPS,
  TRANSCRIBE_CLIP,
} from './actionTypes';
import {
  fetchFailed,
  fetchSuccess,
} from './actions';

function* fetchUsers() {
  console.log('fetch!')
  try {
    const results = yield call(fetch, '/api/users', {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = yield results.json();
    yield put(fetchSuccess('users', data));
  } catch (e) {
    yield put(fetchFailed());
  }
}

function* fetchClips() {
  console.log('fetch!')
  try {
    const results = yield call(fetch, '/api/clips', {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = yield results.json();
    yield put(fetchSuccess('users', data));
  } catch (e) {
    yield put(fetchFailed());
  }
}

function* transcribeClip() {
  console.log('transcribe!')
  try {
    const results = yield call(fetch, '/api/clips/download', {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = yield results.json();
    yield put(fetchSuccess('users', data));
  } catch (e) {
    yield put(fetchFailed());
  }
}

function* twitchToTextSaga() {
  yield all([
    takeEvery(FETCH_USERS, fetchUsers),
    takeEvery(FETCH_CLIPS, fetchClips),
    takeEvery(TRANSCRIBE_CLIP, transcribeClip),
  ]);
}

export { twitchToTextSaga };