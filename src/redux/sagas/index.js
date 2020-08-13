import { all } from 'redux-saga/effects';
import allClothesSaga from './allClothesSaga';
import changeSaga from './changeSaga';
import closetSaga from './closetSaga';
import inputSaga from './inputSaga';
import loginSaga from './loginSaga';
import outfitSaga from './outfitSaga';
import registrationSaga from './registrationSaga';
import senarioSaga from './senarioSaga';
import userSaga from './userSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    allClothesSaga(),
    changeSaga(),
    closetSaga(),
    inputSaga(),
    loginSaga(),
    outfitSaga(),
    registrationSaga(),
    userSaga(),
    senarioSaga()
  ]);
}
