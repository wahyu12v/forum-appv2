const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = {
  // Auth
  register: async ({ name, email, password }) => {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.user;
  },

  login: async ({ email, password }) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.token;
  },

  getOwnProfile: async (token) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.user;
  },

  getAllUsers: async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.users;
  },

  // Threads
  getAllThreads: async () => {
    const response = await fetch(`${BASE_URL}/threads`);
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.threads;
  },

  getThreadDetail: async (threadId) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.detailThread;
  },

  createThread: async ({ title, body, category }, token) => {
    const response = await fetch(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body, category }),
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.thread;
  },

  // Comments
  createComment: async ({ threadId, content }, token) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.comment;
  },

  // Votes
  upvoteThread: async (threadId, token) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.vote;
  },

  downvoteThread: async (threadId, token) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.vote;
  },

  neutralvoteThread: async (threadId, token) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.vote;
  },

  upvoteComment: async (threadId, commentId, token) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.vote;
  },

  downvoteComment: async (threadId, commentId, token) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.vote;
  },

  neutralvoteComment: async (threadId, commentId, token) => {
    const response = await fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.vote;
  },

  // Leaderboard
  getLeaderboard: async () => {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const data = await response.json();
    if (data.status !== 'success') throw new Error(data.message);
    return data.data.leaderboards;
  },
};

export default api;
