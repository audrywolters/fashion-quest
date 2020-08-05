// import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchInput( action ) {
    try {
        yield put({ type: 'SET_INPUT', payload: action.payload })
    } catch ( error ) {
        console.log('Input get request failed', error);
    }
}

function* inputSaga() {
    yield takeLatest('FETCH_INPUT', fetchInput);
}

export default inputSaga;
