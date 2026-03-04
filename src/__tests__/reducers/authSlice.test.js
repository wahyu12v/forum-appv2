import authReducer, {
  setLoading,
  setUser,
  setToken,
  setError,
  logout,
} from '../../store/slices/authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
  };

  it('should return initial state when given undefined state', () => {
    const result = authReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle setLoading to true', () => {
    const result = authReducer(initialState, setLoading(true));
    expect(result.loading).toBe(false);
  });

  it('should handle setLoading to false', () => {
    const state = { ...initialState, loading: true };
    const result = authReducer(state, setLoading(false));
    expect(result.loading).toBe(false);
  });

  it('should handle setUser correctly', () => {
    const user = { id: 'user-1', name: 'John', email: 'john@test.com' };
    const result = authReducer(initialState, setUser(user));
    expect(result.user).toEqual(user);
  });

  it('should handle setToken correctly', () => {
    const result = authReducer(initialState, setToken('token-abc'));
    expect(result.token).toBe('token-abc');
  });

  it('should handle setError correctly', () => {
    const result = authReducer(initialState, setError('Email atau password salah'));
    expect(result.error).toBe('Email atau password salah');
  });

  it('should handle logout - clear user, token, error', () => {
    const loggedInState = {
      user: { id: 'user-1', name: 'John' },
      token: 'token-abc',
      loading: false,
      error: null,
    };
    const result = authReducer(loggedInState, logout());
    expect(result.user).toBeNull();
    expect(result.token).toBeNull();
    expect(result.error).toBeNull();
  });
});
