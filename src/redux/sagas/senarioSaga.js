// import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSenario() {
  try {
    //const response = yield axios.get('/api/user', config);

    const senarioList = [
                        'Steve says hi',
                        'Hey drink coffee',
                        'Go away',
                        'Time to Party',
                        'Free shirts',
                        'Party awareness'
                     ];

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_SENARIO', payload: senarioList });

  } catch (error) {
    console.log('Senario get request failed', error);
  }
}

function* senarioSaga() {
    yield takeLatest('FETCH_SENARIO', fetchSenario);
}

export default senarioSaga;
