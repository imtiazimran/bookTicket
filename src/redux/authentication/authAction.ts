// authActions.ts

import { Dispatch } from 'redux';
import axios from 'axios';
import { base } from '../../utils/baseApi';

export const loginUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get(base+'/auth/google'); // Dispatches request to Google OAuth
      dispatch({ type: 'LOGIN_SUCCESS', payload: res?.data }); // Dispatches success action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      dispatch({ type: 'LOGIN_FAIL', payload: error?.response?.data  }); // Dispatches failure action
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get(base+'/logout'); // Dispatches request to logout
      dispatch({ type: 'LOGOUT_SUCCESS', payload: res.data }); // Dispatches success action
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data }); // Dispatches failure action
    }
  };
};
