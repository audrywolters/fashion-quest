import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSenario() {
  try {

    const response = yield axios.get('/api/senario');

    yield put({ type: 'SET_SENARIO', payload: response.data });

  } catch (error) {
    console.log('Senario get request failed', error);
  }
}

function* senarioSaga() {
    yield takeLatest('FETCH_SENARIO', fetchSenario);
}

export default senarioSaga;
