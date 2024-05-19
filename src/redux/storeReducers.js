//in store reducer we manage multiple reducers ; 5th go to store.js & import reducers & pass it into reducer: reducers,
// 6th go to sagas folder & write the saga logic

import loginReducer from "./slicers/loginSlicer"; //using this export default  grabbing  loginSlicer.reducer;
import registerReducer from "./slicers/registerSlicer";
import myCartReducer from "./slicers/myCartSlicer";

const reducers = {
    loginReducer: loginReducer,
    registerReducer: registerReducer,
    myCartReducer: myCartReducer,
   
}

export default reducers;