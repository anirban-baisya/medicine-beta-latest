//at 1st i have to create store ; (combining saga & reducer/storeReducers here) ; 2nd we have write the  slicers(ex. loginSlicer.js)

import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './sagas';
import reducers from './storeReducers';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]; 
const devMode = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware), //(getDefaultMiddleware) getting default middleware , so that we can concat it with [sagaMiddleware]
  devTools: devMode //this is to see the activity in insepct window
});

sagaMiddleware.run(rootSaga)