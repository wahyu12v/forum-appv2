import api from '../../utils/api';
import { setLoading, setUsers, setLeaderboard, setError } from '../slices/usersSlice';

export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const users = await api.getAllUsers();
    dispatch(setUsers(users));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const leaderboard = await api.getLeaderboard();
    dispatch(setLeaderboard(leaderboard));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
