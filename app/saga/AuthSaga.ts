import {
  call,
  put,
  race,
  take,
  takeLatest,
  type CallEffect,
  type CancelledEffect
} from 'redux-saga/effects';
import { apiCall } from '../configs';
import { ErrorResponse, UserResponse } from '../models';
import { AuthActions } from '../redux';
import Services, { type AuthServiceType } from '../services';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ApiResponse } from 'apisauce';
import type { ClassConstructor } from 'class-transformer';

const authApi: AuthServiceType = Services.authApi();

// SignIn API Call
/**
 * A generator function that handles the success case for the sign in request.
 * @param {UserResponse} response - the response from the server.
 * @returns None
 */
function* signInSuccess(response: UserResponse /*, payload: Record<string, any>*/) {
  yield put(AuthActions.signinSuccess(response));
}

/**
 * A generator function that handles the failure of a sign in attempt.
 * @param {ErrorResponse} error - the error that occurred during the sign in attempt.
 * @returns None
 */
function* signInFailure(error: ErrorResponse /*, payload: Record<string, any>*/) {
  yield put(AuthActions.signinFail(error));
}

/**
 * Sign in the user.
 * @param {AuthServiceType} api - The API service to use.
 * @param {PayloadAction<Record<string, any>>} action - The action to perform.
 * @returns None
 */
function* signIn({ payload }: PayloadAction<Record<string, any>>) {
  yield call<
    (
      api: (credentials: Record<string, any>) => Promise<ApiResponse<UserResponse>>,
      payload: Record<string, any>,
      onSuccess: (response: UserResponse, payload: Record<string, any>) => any,
      onFailure: (error: ErrorResponse, payload: Record<string, any>) => any,
      responseModel: ClassConstructor<UserResponse>
    ) => Generator<CallEffect<unknown> | CancelledEffect, void, any>
  >(
    apiCall<Record<string, any>, UserResponse>,
    authApi.signIn,
    payload,
    signInSuccess,
    signInFailure,
    UserResponse
  );
}

/**
 * A generator function that watches for a sign in request and either calls the sign in function, or cancels the request.
 * @param {PayloadAction<Record<string, any>>} action - The action that triggered the generator.
 * @returns None
 */
function* watchSignIn(action: PayloadAction<Record<string, any>>) {
  yield race([call(signIn, action), take(AuthActions.signinRequestCancel.toString())]);
}

export default [takeLatest(AuthActions.signinRequest.toString(), watchSignIn)];
