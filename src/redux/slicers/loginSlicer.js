//here we write action, reducer ; 3rd go to storeReducers & imports loginSlicer.reducer & mentioned it in reducers{... }
import { createSlice } from '@reduxjs/toolkit';

export const loginSlicer = createSlice({ //whole slicer
    name: 'login', //this is the name of reducer
    initialState: {
        isLoading: false,
        isError: false,
        data: null, //it's store all the respons from the api
        error: {}
    },
    reducers: { //different actions
        onUserLoginSubmit: (state) => {
            // console.log('---->>>',state)
            return { ...state, isLoading: true, isError: false }
        },
        onUserLoginSubmitSuccess: (state, { payload }) => {
            // console.log('fffff', state, payload)  //consolig the respons comming from sagas/loginSaga.js
            return { ...state, isLoading: false, isError: false, data: payload }
        },
        onUserLoginSubmitError: (state, { payload }) => {
            return { ...state, isLoading: false, isError: true, error: payload }
        },

        resetLogedInUserInfo: (state) => ({
			...state,
			data: null,
            message: null
		}),
    }
})

export const { onUserLoginSubmit, onUserLoginSubmitSuccess, onUserLoginSubmitError, resetLogedInUserInfo } = loginSlicer.actions; //this is action ; exporting all of the 3 actions from loginSlicer.actions= { onUserLoginSubmit, ..... }

export default loginSlicer.reducer; // this is reducer (it alows us to grab the reducer)