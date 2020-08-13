
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

  function* updateOutfit( action ) {
    try {
      const response = yield axios.put( '/api/change', action.payload );   
      yield put({ type: 'UPDATE_OUTFIT', payload: response.data });
      
    } catch (error) {
      console.log( 'Change Outfit Put request failed', error );
    }
  }

  function* changeSaga() {
    yield takeLatest( 'CHANGE_OUTFIT', updateOutfit );
  }

export default changeSaga;
