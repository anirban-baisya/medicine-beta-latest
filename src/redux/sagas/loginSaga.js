import { call, put, takeLatest } from "redux-saga/effects";
import {
  onUserLoginSubmit,
  onUserLoginSubmitSuccess,
  onUserLoginSubmitError,
} from "../slicers/loginSlicer";
import { callLoginApi } from "../../services/Login/loginApi";

function* doUserLogin({ payload }) {
  // const { query } = payload;
  // console.log(payload,'1234567890')
  if (payload) {
    try {
      const userLoginResponse = yield call(callLoginApi, payload);
      // console.log("-=-=-= >>> ", userLoginResponse) //after receving response from api we have to call the onUserLoginSubmitSuccess(userLoginResponse) action
      yield put(onUserLoginSubmitSuccess(userLoginResponse)); //after passing we can check it in slicer/loginSlicer.js & console it
    } catch {
      const message = "something went wrong";
      yield put(onUserLoginSubmitError({ message }));
    }
  }
}

export default function* loginSaga() {
  //this is a saga watcher function
  yield takeLatest(onUserLoginSubmit.type, doUserLogin);
}

/*
call :- allows us to call urls && apis
put :-  allows us to call our actions
*/
