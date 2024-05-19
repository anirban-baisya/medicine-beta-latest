import { call, put, takeLatest } from "redux-saga/effects";
import {
  onUserRegisterSubmit,
  onUserRegisterSubmitSuccess,
  onUserRegisterSubmitError,
} from "../slicers/registerSlicer";
import { callRegisterApi } from "../../services/Register/registerApi";

function* doUserRegister({ payload }) {
  // const { query } = payload;
  // console.log(payload,'1234567890')
  if (payload) {
    try {
      const userRegisterResponse = yield call(callRegisterApi, payload);
      // console.log("-=-=-= >>> ", userRegisterResponse) //after receving response from api we have to call the onUserRegisterSubmitSuccess(userLoginResponse) action
      yield put(onUserRegisterSubmitSuccess(userRegisterResponse)); //after passing we can check it in slicer/loginSlicer.js & console it
    } catch {
      const message = "something went wrong";
      yield put(onUserRegisterSubmitError({ message }));
    }
  }
}

export default function* registerSaga() {
  //this is a saga watcher function
  yield takeLatest(onUserRegisterSubmit.type, doUserRegister);
}

/*
call :- allows us to call urls && apis
put :-  allows us to call our actions
*/
