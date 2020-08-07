import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

  function* fetchAllClothes( action ) {
    try {
      const response = yield axios.get( '/api/allClothes', action.payload );
      yield put({ type: 'SET_ALL_CLOTHES', payload: response.data });
      
    } catch (error) {
      console.log('All Clothes get request failed', error);
    }
  }

  function* allClothesSaga() {
    yield takeLatest( 'FETCH_ALL_CLOTHES', fetchAllClothes );
  }

export default allClothesSaga;
