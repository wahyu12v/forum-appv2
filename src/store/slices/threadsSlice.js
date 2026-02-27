import { createSlice } from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    list: [],
    detail: null,
    loading: false,
    error: null,
    activeCategory: '',
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setThreads: (state, action) => {
      state.list = action.payload;
    },
    setThreadDetail: (state, action) => {
      state.detail = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    addThread: (state, action) => {
      state.list.unshift(action.payload);
    },
    // Optimistic vote on thread list
    optimisticVoteThread: (state, action) => {
      const { threadId, voteType, userId } = action.payload;
      const thread = state.list.find((t) => t.id === threadId);
      if (thread) {
        // Remove existing votes by user
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        if (voteType === 'up') thread.upVotesBy.push(userId);
        if (voteType === 'down') thread.downVotesBy.push(userId);
      }
    },
    // Optimistic vote on thread detail
    optimisticVoteDetailThread: (state, action) => {
      const { voteType, userId } = action.payload;
      if (state.detail) {
        state.detail.upVotesBy = state.detail.upVotesBy.filter((id) => id !== userId);
        state.detail.downVotesBy = state.detail.downVotesBy.filter((id) => id !== userId);
        if (voteType === 'up') state.detail.upVotesBy.push(userId);
        if (voteType === 'down') state.detail.downVotesBy.push(userId);
      }
    },
    // Optimistic vote on comment
    optimisticVoteComment: (state, action) => {
      const { commentId, voteType, userId } = action.payload;
      if (state.detail) {
        const comment = state.detail.comments.find((c) => c.id === commentId);
        if (comment) {
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          if (voteType === 'up') comment.upVotesBy.push(userId);
          if (voteType === 'down') comment.downVotesBy.push(userId);
        }
      }
    },
    addComment: (state, action) => {
      if (state.detail) {
        state.detail.comments.unshift(action.payload);
      }
    },
  },
});

export const {
  setLoading,
  setThreads,
  setThreadDetail,
  setError,
  setActiveCategory,
  addThread,
  optimisticVoteThread,
  optimisticVoteDetailThread,
  optimisticVoteComment,
  addComment,
} = threadsSlice.actions;

export default threadsSlice.reducer;
