import threadsReducer, {
  setLoading,
  setThreads,
  setThreadDetail,
  setError,
  setActiveCategory,
  addThread,
  optimisticVoteThread,
  optimisticVoteComment,
  addComment,
} from '../../store/slices/threadsSlice';

const initialState = {
  list: [],
  detail: null,
  loading: false,
  error: null,
  activeCategory: '',
};

const mockThread = {
  id: 'thread-1',
  title: 'Test Thread',
  body: 'Test body',
  category: 'general',
  createdAt: '2024-01-01',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
  ownerId: 'user-1',
};

describe('threadsSlice reducer', () => {
  it('should return initial state when given undefined state', () => {
    const result = threadsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle setLoading', () => {
    const result = threadsReducer(initialState, setLoading(true));
    expect(result.loading).toBe(true);
  });

  it('should handle setThreads', () => {
    const threads = [mockThread];
    const result = threadsReducer(initialState, setThreads(threads));
    expect(result.list).toEqual(threads);
    expect(result.list).toHaveLength(1);
  });

  it('should handle setThreadDetail', () => {
    const detail = { ...mockThread, comments: [] };
    const result = threadsReducer(initialState, setThreadDetail(detail));
    expect(result.detail).toEqual(detail);
  });

  it('should handle setError', () => {
    const result = threadsReducer(initialState, setError('Something went wrong'));
    expect(result.error).toBe('Something went wrong');
  });

  it('should handle setActiveCategory', () => {
    const result = threadsReducer(initialState, setActiveCategory('redux'));
    expect(result.activeCategory).toBe('redux');
  });

  it('should handle addThread - prepend to list', () => {
    const stateWithThreads = { ...initialState, list: [mockThread] };
    const newThread = { ...mockThread, id: 'thread-2', title: 'New Thread' };
    const result = threadsReducer(stateWithThreads, addThread(newThread));
    expect(result.list[0]).toEqual(newThread);
    expect(result.list).toHaveLength(2);
  });

  it('should handle optimisticVoteThread - upvote', () => {
    const stateWithThread = { ...initialState, list: [{ ...mockThread }] };
    const result = threadsReducer(
      stateWithThread,
      optimisticVoteThread({ threadId: 'thread-1', voteType: 'up', userId: 'user-1' }),
    );
    expect(result.list[0].upVotesBy).toContain('user-1');
    expect(result.list[0].downVotesBy).not.toContain('user-1');
  });

  it('should handle optimisticVoteThread - downvote', () => {
    const stateWithThread = { ...initialState, list: [{ ...mockThread }] };
    const result = threadsReducer(
      stateWithThread,
      optimisticVoteThread({ threadId: 'thread-1', voteType: 'down', userId: 'user-1' }),
    );
    expect(result.list[0].downVotesBy).toContain('user-1');
    expect(result.list[0].upVotesBy).not.toContain('user-1');
  });

  it('should handle optimisticVoteThread - neutral removes existing vote', () => {
    const stateWithVotedThread = {
      ...initialState,
      list: [{ ...mockThread, upVotesBy: ['user-1'] }],
    };
    const result = threadsReducer(
      stateWithVotedThread,
      optimisticVoteThread({ threadId: 'thread-1', voteType: 'neutral', userId: 'user-1' }),
    );
    expect(result.list[0].upVotesBy).not.toContain('user-1');
  });

  it('should handle addComment', () => {
    const stateWithDetail = {
      ...initialState,
      detail: { ...mockThread, comments: [] },
    };
    const newComment = {
      id: 'comment-1',
      content: 'Test comment',
      createdAt: '2024-01-01',
      upVotesBy: [],
      downVotesBy: [],
      owner: { id: 'user-1', name: 'John', avatar: '' },
    };
    const result = threadsReducer(stateWithDetail, addComment(newComment));
    expect(result.detail.comments[0]).toEqual(newComment);
  });

  it('should handle optimisticVoteComment - upvote', () => {
    const comment = {
      id: 'comment-1',
      content: 'test',
      upVotesBy: [],
      downVotesBy: [],
    };
    const stateWithComment = {
      ...initialState,
      detail: { ...mockThread, comments: [comment] },
    };
    const result = threadsReducer(
      stateWithComment,
      optimisticVoteComment({ commentId: 'comment-1', voteType: 'up', userId: 'user-1' }),
    );
    expect(result.detail.comments[0].upVotesBy).toContain('user-1');
  });
});
