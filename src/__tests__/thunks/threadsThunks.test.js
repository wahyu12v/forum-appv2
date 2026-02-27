import {
  fetchThreads,
  fetchThreadDetail,
  createThread,
  voteThread,
} from '../../store/thunks/threadsThunks';
import {
  setLoading,
  setThreads,
  setThreadDetail,
  setError,
  addThread,
  optimisticVoteThread,
  optimisticVoteDetailThread,
} from '../../store/slices/threadsSlice';
import api from '../../utils/api';

jest.mock('../../utils/api');

const mockThread = {
  id: 'thread-1',
  title: 'Test Thread',
  body: 'Test body',
  category: 'general',
  createdAt: '2024-01-01T00:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  ownerId: 'user-1',
};

const createDispatch = (authState = { token: 'token-abc', user: { id: 'user-1' } }) => {
  const dispatched = [];
  const dispatch = jest.fn((action) => {
    if (typeof action === 'function') {
      return action(dispatch, () => ({ auth: authState }));
    }
    dispatched.push(action);
    return action;
  });
  dispatch.dispatched = dispatched;
  return dispatch;
};

describe('threadsThunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchThreads', () => {
    it('should dispatch setThreads on success', async () => {
      const mockThreads = [mockThread];
      api.getAllThreads.mockResolvedValue(mockThreads);

      const dispatch = createDispatch();
      await fetchThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(dispatch).toHaveBeenCalledWith(setThreads(mockThreads));
      expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    });

    it('should dispatch setError on failure', async () => {
      api.getAllThreads.mockRejectedValue(new Error('Network error'));

      const dispatch = createDispatch();
      await fetchThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setError('Network error'));
      expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    });
  });

  describe('fetchThreadDetail', () => {
    it('should dispatch setThreadDetail on success', async () => {
      const detail = { ...mockThread, comments: [] };
      api.getThreadDetail.mockResolvedValue(detail);

      const dispatch = createDispatch();
      await fetchThreadDetail('thread-1')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(dispatch).toHaveBeenCalledWith(setThreadDetail(detail));
      expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    });

    it('should dispatch setError when thread not found', async () => {
      api.getThreadDetail.mockRejectedValue(new Error('Thread not found'));

      const dispatch = createDispatch();
      await fetchThreadDetail('thread-invalid')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setError('Thread not found'));
    });
  });

  describe('createThread', () => {
    it('should dispatch addThread and return thread on success', async () => {
      api.createThread.mockResolvedValue(mockThread);

      const dispatch = createDispatch();
      const result = await createThread({
        title: 'Test Thread',
        body: 'Test body',
        category: 'general',
      })(dispatch, () => ({ auth: { token: 'token-abc' } }));

      expect(dispatch).toHaveBeenCalledWith(addThread(mockThread));
      expect(result).toEqual(mockThread);
    });

    it('should dispatch setError and return null on failure', async () => {
      api.createThread.mockRejectedValue(new Error('Unauthorized'));

      const dispatch = createDispatch();
      const result = await createThread({
        title: 'Test',
        body: 'Body',
        category: '',
      })(dispatch, () => ({ auth: { token: 'token-abc' } }));

      expect(dispatch).toHaveBeenCalledWith(setError('Unauthorized'));
      expect(result).toBeNull();
    });
  });

  describe('voteThread', () => {
    it('should dispatch optimistic actions on upvote', async () => {
      api.upvoteThread.mockResolvedValue({});

      const dispatch = createDispatch();
      await voteThread('thread-1', 'up')(
        dispatch,
        () => ({ auth: { token: 'token-abc', user: { id: 'user-1' } } }),
      );

      expect(dispatch).toHaveBeenCalledWith(
        optimisticVoteThread({ threadId: 'thread-1', voteType: 'up', userId: 'user-1' }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        optimisticVoteDetailThread({ voteType: 'up', userId: 'user-1' }),
      );
    });

    it('should not dispatch if no token', async () => {
      const dispatch = createDispatch({ token: null, user: null });
      await voteThread('thread-1', 'up')(
        dispatch,
        () => ({ auth: { token: null, user: null } }),
      );

      expect(api.upvoteThread).not.toHaveBeenCalled();
    });
  });
});
