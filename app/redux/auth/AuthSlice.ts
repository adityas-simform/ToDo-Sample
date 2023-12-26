import { createSlice, type Draft, type PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse, UserResponse } from '../../models';
import INITIAL_STATE, { type AuthStateType } from './AuthInitial';

/**
 * A reducer for the sign in request action.
 * @param {Draft<AuthStateType>} _state - The current state of the auth reducer.
 * @param {PayloadAction<SignInRequest | undefined>} _action - The action to handle.
 * @returns None
 */
function signinRequest(
  state: Draft<AuthStateType>,
  _action: PayloadAction<Record<string, any> | undefined>
): void {
  state.isLoading = true;
}

/**
 * A function that cancels the sign in request.
 * @returns None
 */
function signinRequestCancel(): void {}

/**
 * Updates the user state with the user response from the server.
 * @param {Draft<AuthStateType>} state - The current state of the application.
 * @param {PayloadAction<UserResponse | undefined>} action - The action to be performed.
 * @returns None
 */
function signinSuccess(
  state: Draft<AuthStateType>,
  action: PayloadAction<UserResponse | undefined>
): void {
  state.isLoading = false;
  state.user = action.payload;
}

/**
 * Updates the user state with the user response from the server.
 * @param {Draft<AuthStateType>} state - The current state of the application.
 * @param {PayloadAction<UserResponse | undefined>} action - The action to be performed.
 * @returns None
 */
function signinFail(
  state: Draft<AuthStateType>,
  action: PayloadAction<ErrorResponse | undefined>
): void {
  state.isLoading = false;
  state.error = action.payload;
}

/**
 * Creating a auth slice of the redux store
 * @param {AuthStateType} state - The current state of the auth reducer.
 * @param {Action} action - The action to handle.
 * @returns {AuthStateType} The new state of the auth reducer.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    signinSuccess,
    signinFail,
    signinRequest,
    signinRequestCancel
  }
});

/* Exporting the reducer function that will be used in the root reducer. */
export const AuthReducer = authSlice.reducer;

/**
 * Creates an object with all of the actions for the auth slice.
 * @returns {Object} - An object with all of the actions for the auth slice.
 */
export const AuthActions = authSlice.actions;
