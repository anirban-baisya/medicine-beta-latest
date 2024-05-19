//here we write action, reducer ; 3rd go to storeReducers & imports registerSlicer.reducer & mentioned it in reducers{... }
import { createSlice } from '@reduxjs/toolkit';

export const registerSlicer = createSlice({ //whole slicer
    name: 'register', //this is the name of reducer
    initialState: {
        isLoading: false,
        isError: false,
        data: null, //it's store all the respons from the api
        error: {}
    },
    reducers: { //different actions
        onUserRegisterSubmit: (state) => {
            // console.log(state)
            return { ...state, isLoading: true, isError: false }
        },
        onUserRegisterSubmitSuccess: (state, { payload }) => {
            // console.log('fffff', state, payload)  //consolig the respons comming from sagas/loginSaga.js
            return { ...state, isLoading: false, isError: false, data: payload }
        },
        onUserRegisterSubmitError: (state, { payload }) => {
            return { ...state, isLoading: false, isError: true, error: payload }
        },

        resetRegisterInfo: (state) => ({
			...state,
			data: null,
            message: null
		})
    }
})

export const { onUserRegisterSubmit, onUserRegisterSubmitSuccess, onUserRegisterSubmitError , resetRegisterInfo} = registerSlicer.actions; //this is action ; exporting all of the 3 actions from registerSlicer.actions= { onUserRegisterSubmit, ..... }

export default registerSlicer.reducer; // this is reducer (it alows us to grab the reducer)