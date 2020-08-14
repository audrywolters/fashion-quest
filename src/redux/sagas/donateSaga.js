
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

  function* donateClothing( action ) {
    try {
      yield axios.post( '/api/donate', action.payload );
      
    } catch (error) {
      console.log( 'Donate clothing DELETE request failed', error );
    }
  }

  function* changeSaga() {
    yield takeLatest( 'DONATE', donateClothing );
  }

export default changeSaga;
