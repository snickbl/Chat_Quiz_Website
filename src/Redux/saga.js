import { takeLatest, put } from 'redux-saga/effects';
import { saveUsers } from './actions';

function* fetchDataSaga() {
  try {
    yield put(saveUsers()); 
  } catch (error) {
    console.log('ERROR');
  }
}

function* rootSaga() {
  yield takeLatest('FETCH_DATA', fetchDataSaga);
}

export default rootSaga;