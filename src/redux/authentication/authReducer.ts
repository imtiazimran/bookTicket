/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';
import axios from 'axios';
import { base } from '../../utils/baseApi';

// Define action types
enum AuthActionTypes {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAIL = 'LOGOUT_FAIL',
}

// Define action interfaces
interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS;
  payload: any; // Update with actual payload type
}

interface LoginFailAction {
  type: AuthActionTypes.LOGIN_FAIL;
  payload: string; // Update with actual payload type
}

interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS;
  payload: any; // Update with actual payload type
}

interface LogoutFailAction {
  type: AuthActionTypes.LOGOUT_FAIL;
  payload: string; // Update with actual payload type
}

// Define union type for all action types
type AuthAction =
  | LoginSuccessAction
  | LoginFailAction
  | LogoutSuccessAction
  | LogoutFailAction;

// Async action creator for login
export const loginUser = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const res = await axios.get(base + '/auth/google');
      dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: res.data });
    } catch (error: any) {
      dispatch({ type: AuthActionTypes.LOGIN_FAIL, payload: error.response.data });
    }
  };
};

// Async action creator for logout
export const logoutUser = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const res = await axios.get(base + '/logout');
      dispatch({ type: AuthActionTypes.LOGOUT_SUCCESS, payload: res.data });
    } catch (error: any) {
      dispatch({ type: AuthActionTypes.LOGOUT_FAIL, payload: error.response.data });
    }
  };
};
