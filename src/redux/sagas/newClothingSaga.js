
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* getNewClothingID( action ) {
    try {
        const response = yield axios.get( '/api/new', action.payload );
        yield put({ type: 'SET_NEW_CLOTHING_ID', payload: response.data });
      
    } catch (error) {
      console.log( 'New clothing ADD request failed', error );
    }
  }

  function* andNewClothing( action ) {
    try {
        //const response = 
        yield axios.post( '/api/new', action.payload );
        // no need to do anything else
        // DB will put this in closet table for us
        // add we need do is this.getCloset();
        //yield put({ type: 'SET_NEW_CLOTHING', payload: response.data });
    
        // AUDRY - put this in closet...
    } catch (error) {
      console.log( 'New clothing ADD request failed', error );
    }
  }

  function* newClothingSaga() {
    yield takeLatest( 'FETCH_NEW_CLOTHING_ID', getNewClothingID );
    yield takeLatest( 'ADD_NEW_CLOTHING', andNewClothing );
  }

export default newClothingSaga;
