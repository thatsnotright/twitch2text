import {
  FETCH_CLIPS,
  FETCH_USERS,
  FETCH_FAILURE,
  FETCH_SUCCESS,
  TRANSCRIBE_CLIP,
} from './actionTypes'

export const fetchClips = () => ({
  type: FETCH_CLIPS,
});

export const fetchUsers = () => ({
  type: FETCH_USERS,
});
export const fetchFailed = () => ({
  type: FETCH_FAILURE,
});

export const fetchSuccess = (dataType, data) => ({
  type: FETCH_SUCCESS,
  payload: {
    dataType,
    data,
  },
});

/**
 * Transcribe a new clip
 */
export const createTask = (clipId) => ({
  type: TRANSCRIBE_CLIP,
  payload: {
    clipId,
  },
});
