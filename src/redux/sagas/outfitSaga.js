import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchOutfit( action ) {
  try {

    const response = yield axios.get( '/api/outfit', action.payload );

    yield put({ type: 'SET_OUTFIT', payload: response.data });
    
  } catch (error) {
    console.log('Outfit get request failed', error);
  }
}

function* outfitSaga() {
    yield takeLatest( 'FETCH_OUTFIT', fetchOutfit );
}

export default outfitSaga;
