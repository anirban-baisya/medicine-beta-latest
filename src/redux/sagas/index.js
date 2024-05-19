// here we manage multiple saga files && // 7th go to store.js & import rootSaga and call sagaMiddleware.run(rootSaga)
import { all } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import registerSaga from "./registerSaga";


export default function* rootSaga() {
    yield all([
        loginSaga(),
        registerSaga(),
       
    ]);
}


