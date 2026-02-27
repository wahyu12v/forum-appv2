import { loginUser, logoutUser, registerUser } from '../../store/thunks/authThunks';
import {
  setLoading, setUser, setToken, setError, logout,
} from '../../store/slices/authSlice';
import api from '../../utils/api';
import * as helpers from '../../utils/helpers';

jest.mock('../../utils/api');
jest.mock('../../utils/helpers');

const createDispatch = () => {
  const dispatched = [];
  const dispatch = jest.fn((action) => {
    if (typeof action === 'function') {
      return action(dispatch, () => ({ auth: { token: 'token-abc', user: { id: 'user-1' } } }));
    }
    dispatched.push(action);
    return action;
  });
  dispatch.dispatched = dispatched;
  return dispatch;
};

describe('authThunks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should dispatch setToken and setUser on successful login', async () => {
      const mockToken = 'token-abc';
      const mockUser = { id: 'user-1', name: 'John', email: 'john@test.com' };

      api.login.mockResolvedValue(mockToken);
      api.getOwnProfile.mockResolvedValue(mockUser);
      helpers.setTokenToStorage.mockImplementation(() => {});

      const dispatch = createDispatch();
      await loginUser({ email: 'john@test.com', password: '12345678' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setLoading(true));
      expect(dispatch).toHaveBeenCalledWith(setToken(mockToken));
      expect(dispatch).toHaveBeenCalledWith(setUser(mockUser));
      expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    });

    it('should dispatch setError on failed login', async () => {
      api.login.mockRejectedValue(new Error('Email atau password salah'));

      const dispatch = createDispatch();
      await loginUser({ email: 'wrong@test.com', password: 'wrongpass' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setError('Email atau password salah'));
      expect(dispatch).toHaveBeenCalledWith(setLoading(false));
    });
  });

  describe('logoutUser', () => {
    it('should call removeTokenFromStorage and dispatch logout', () => {
      helpers.removeTokenFromStorage.mockImplementation(() => {});

      const dispatch = createDispatch();
      logoutUser()(dispatch);

      expect(helpers.removeTokenFromStorage).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(logout());
    });
  });

  describe('registerUser', () => {
    it('should call api.register then loginUser on success', async () => {
      const mockToken = 'token-new';
      const mockUser = { id: 'user-2', name: 'Jane', email: 'jane@test.com' };

      api.register.mockResolvedValue(mockUser);
      api.login.mockResolvedValue(mockToken);
      api.getOwnProfile.mockResolvedValue(mockUser);
      helpers.setTokenToStorage.mockImplementation(() => {});

      const dispatch = createDispatch();
      await registerUser({ name: 'Jane', email: 'jane@test.com', password: '12345678' })(dispatch);

      expect(api.register).toHaveBeenCalledWith({
        name: 'Jane',
        email: 'jane@test.com',
        password: '12345678',
      });
    });

    it('should dispatch setError when register fails', async () => {
      api.register.mockRejectedValue(new Error('Email already taken'));

      const dispatch = createDispatch();
      await registerUser({ name: 'Jane', email: 'taken@test.com', password: '12345678' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(setError('Email already taken'));
    });
  });
});
