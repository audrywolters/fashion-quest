
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getNewClothingID( action ) {
    try {
        const response = yield axios.get( '/api/new', action.payload );
        yield put({ type: 'SET_NEW_CLOTHING', payload: response.data });
      
    } catch (error) {
      console.log( 'New clothing ADD request failed', error );
    }
  }

  function* andNewClothing( action ) {
    try {
        yield axios.post( '/api/new', action.payload );
        // no need to do anything else
        // DB will put this in closet table for us
        
        // add we need do is this.getCloset();

    } catch (error) {
      console.log( 'New clothing ADD request failed', error );
    }
  }

  function* newClothingSaga() {
    yield takeLatest( 'FETCH_NEW_CLOTHING', getNewClothingID );
    yield takeLatest( 'ADD_NEW_CLOTHING', andNewClothing );
  }

export default newClothingSaga;
