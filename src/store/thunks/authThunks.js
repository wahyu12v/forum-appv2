import api from '../../utils/api';
import {
  setLoading, setUser, setToken, setError, logout as logoutAction,
} from '../slices/authSlice';
import { getTokenFromStorage, setTokenToStorage, removeTokenFromStorage } from '../../utils/helpers';

export const initializeAuth = () => async (dispatch) => {
  const token = getTokenFromStorage();
  if (!token) return;

  dispatch(setLoading(true));
  try {
    dispatch(setToken(token));
    const user = await api.getOwnProfile(token);
    dispatch(setUser(user));
  } catch {
    removeTokenFromStorage();
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const token = await api.login({ email, password });
    setTokenToStorage(token);
    dispatch(setToken(token));
    const user = await api.getOwnProfile(token);
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerUser = ({ name, email, password }) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await api.register({ name, email, password });
    await dispatch(loginUser({ email, password }));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => (dispatch) => {
  removeTokenFromStorage();
  dispatch(logoutAction());
};
