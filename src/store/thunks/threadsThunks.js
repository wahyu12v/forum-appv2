import api from '../../utils/api';
import {
  setLoading,
  setThreads,
  setThreadDetail,
  setError,
  addThread,
  optimisticVoteThread,
  optimisticVoteDetailThread,
  optimisticVoteComment,
  addComment,
} from '../slices/threadsSlice';

export const fetchThreads = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const threads = await api.getAllThreads();
    dispatch(setThreads(threads));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchThreadDetail = (threadId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const thread = await api.getThreadDetail(threadId);
    dispatch(setThreadDetail(thread));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createThread = ({ title, body, category }) => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setLoading(true));
  try {
    const thread = await api.createThread({ title, body, category }, token);
    dispatch(addThread(thread));
    return thread;
  } catch (error) {
    dispatch(setError(error.message));
    return null;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createComment = ({ threadId, content }) => async (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(setLoading(true));
  try {
    const comment = await api.createComment({ threadId, content }, token);
    dispatch(addComment(comment));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const voteThread = (threadId, voteType) => async (dispatch, getState) => {
  const { token, user } = getState().auth;
  if (!token) return;

  const userId = user.id;
  // Optimistically apply
  dispatch(optimisticVoteThread({ threadId, voteType, userId }));
  dispatch(optimisticVoteDetailThread({ voteType, userId }));

  try {
    if (voteType === 'up') await api.upvoteThread(threadId, token);
    else if (voteType === 'down') await api.downvoteThread(threadId, token);
    else await api.neutralvoteThread(threadId, token);
  } catch (error) {
    // Revert on error by re-fetching
    dispatch(setError(error.message));
  }
};

export const voteComment = (threadId, commentId, voteType) => async (dispatch, getState) => {
  const { token, user } = getState().auth;
  if (!token) return;

  const userId = user.id;
  dispatch(optimisticVoteComment({ commentId, voteType, userId }));

  try {
    if (voteType === 'up') await api.upvoteComment(threadId, commentId, token);
    else if (voteType === 'down') await api.downvoteComment(threadId, commentId, token);
    else await api.neutralvoteComment(threadId, commentId, token);
  } catch (error) {
    dispatch(setError(error.message));
  }
};
