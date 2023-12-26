import { all } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';

/**
 * The root saga for the application.
 * @returns None
 */
export default function* rootSaga() {
  yield all([...AuthSaga]);
}
