
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

  function* donateClothing( action ) {
    try {
      const response = yield axios.post( '/api/donate', action.payload );   
      yield put({ type: 'DONATE_DELETE', payload: response.data });
      
    } catch (error) {
      console.log( 'Donate clothing DELETE request failed', error );
    }
  }

  function* changeSaga() {
    yield takeLatest( 'DONATE', donateClothing );
  }

export default changeSaga;
