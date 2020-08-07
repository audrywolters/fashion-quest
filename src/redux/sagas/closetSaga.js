import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

  function* fetchCloset( action ) {
    try {
      const response = yield axios.get( '/api/closet', action.payload );
      yield put({ type: 'SET_CLOSET', payload: response.data });
      
    } catch (error) {
      console.log('Closet get request failed', error);
    }
  }

  function* closetSaga() {
    yield takeLatest( 'FETCH_CLOSET', fetchCloset );
  }

export default closetSaga;
