import types from './user.types';
import UserActionTypes from './user.types';

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  payload: user
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = (user) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user
});

export const googleSignInSuccess = (error) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
  payload: error
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START
});

export const emailSignInSuccess = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: emailAndPassword
});

export const emailSignInSuccess = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL1_SIGN_IN_FAILURE,
  payload: emailAndPassword
});


