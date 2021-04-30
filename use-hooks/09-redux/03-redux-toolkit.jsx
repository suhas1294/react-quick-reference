// folder structure
/* 
    src
        store
            index.js
            counter.js
            auth.js
        components
            Counter.jsx
*/

// ------------------------------------------------------------
// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';
const store = configureStore({
    reducer: { counter: counterReducer, auth: authReducer },
});
export default store;

// ------------------------------------------------------------
// src/store/counter.js

import { createSlice } from '@reduxjs/toolkit';
const initialCounterState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter;
        },
    },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;

// ------------------------------------------------------------
// src/store/auth.js

import { createSlice } from '@reduxjs/toolkit';
const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

// ------------------------------------------------------------
// src/App.js

import { useSelector } from 'react-redux';
import Auth from './components/Auth';

export default function App() {
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    return (
        <>
            <Header />
            {!isAuth && <Auth />}
            {isAuth && <UserProfile />}
            <Counter />
        </>
    );
}

// ------------------------------------------------------------
// src/Counter.js

import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';

export default Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector((state) => state.counter.counter);
    const show = useSelector((state) => state.counter.showCounter);

    // executing a function will return this object { type: SOME_UNIQUE_IDENTIFIER, payload: 10 }
    const increaseHandler = () => dispatch(counterActions.increase(10));

    const incrementHandler = () => {
        dispatch(counterActions.increment());
        const decrementHandler = () => dispatch(counterActions.decrement());
        const toggleCounterHandler = () => dispatch(counterActions.toggleCounter());

        return (
            <main className={classes.counter}>
                <h1>Redux Counter</h1>
                {show && <div className={classes.value}>{counter}</div>}
                <div>
                    <button onClick={incrementHandler}>Increment</button>
                    <button onClick={increaseHandler}>Increase by 10</button>
                    <button onClick={decrementHandler}>Decrement</button>
                </div>
                <button onClick={toggleCounterHandler}>Toggle Counter</button>
            </main>
        );
    }
}