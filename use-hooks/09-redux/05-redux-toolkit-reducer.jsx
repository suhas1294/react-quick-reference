// ----------------------------------------------------------------
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import cartSlice from './cart-slice';

export default store = configureStore({
    reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});


// ----------------------------------------------------------------
// src/App.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';;
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;
export default function App() {
    const dispatch = useDispatch();
    const showCart = useSelector((state) => state.ui.cartIsVisible);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    // making a GET request
    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);

    // making a POST request
    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (cart.changed) dispatch(sendCartData(cart));
    }, [cart, dispatch]);

    return (
        <Fragment>
            {notification && (
                <Notification status={notification.status} message={notification.message} />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

// ----------------------------------------------------------------
// src/store/cart-actions.js

import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch('https://react-http-6b4a6.firebaseio.com/cart.json');
            if (!response.ok) throw new Error('Could not fetch cart data!');
            return await response.json();
        };

        try {
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity: cartData.totalQuantity,
                })
            );
        } catch (error) {
            dispatch(uiActions.showNotification({ status: 'error', message: 'Fetching cart data failed!' }));
        }

    };
};

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({ status: 'pending', message: 'Sending cart data!' }));

        const sendRequest = async () => {

            // making POST request
            const response = await fetch(
                'https://react-http-6b4a6.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) throw new Error('Sending cart data failed.');
        };

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({ status: 'success', message: 'Sent cart data successfully!' }));
        } catch (error) {
            dispatch(uiActions.showNotification({ status: 'error', message: 'Sending cart data failed!' }));
        }
    };
};


// ----------------------------------------------------------------
// src/store/cart-slice.js

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.totalQuantity++;
            state.changed = true;
            //  ... buisness logic
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            //  ... buisness logic
        },
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice;