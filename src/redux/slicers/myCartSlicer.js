import { createSlice } from "@reduxjs/toolkit";


export const myCartSlicer = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        // addProductToMyCart(state, action) {
        //     state.push(action.payload);
        // },

        addProductToMyCart(state, action) {

            let myindex = -1;
            state.map((item, index) => {

                if (item.itemId === action.payload.itemId) {
                    myindex = index;
                }
            });

            if (myindex == -1) {

                // Extract payload from action
                let payloadObj = action.payload;

                // Increase purchase quantity by 1 by default for the first time
                payloadObj.purchaseQty = action.payload.purchaseQty + 1;

                // Add updated payload to state
                state.push(payloadObj);
            } else {
                state[myindex].purchaseQty = state[myindex].purchaseQty + 1; //here we are incrementing the product quantity
            }
        },

        removeMyCartItem(state, action) {
            let myindex = -1;
            state.map((item, index) => {

                if (item.itemId === action.payload.itemId) {
                    myindex = index;
                }
            });

            if (myindex == -1) {

            } else {
                state[myindex].purchaseQty = state[myindex].purchaseQty - 1; //here we are decrementing the product quantity
            }
        },

       deleteMyCartItem(state, action) {
        return state = state.filter(item => item.itemId != action.payload)
    
        },
       resetMyCart(state, action) {
        return state = []
        },
        
    },

});

export const { addProductToMyCart, removeMyCartItem , deleteMyCartItem, resetMyCart } = myCartSlicer.actions;
export default myCartSlicer.reducer;