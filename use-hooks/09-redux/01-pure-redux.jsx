// step-1: wrap up the root component
// src/index.js
import { Provider } from 'react-redux';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// -----------------------------------------------
// step-2 : write the reducer logic:
// src/reducer/counter.js
import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };
const counterReducer = (state = initialState, action) => {
    // IMPORTANT !! : always spit out a new state, dont update old state directly
    switch (action.type) {
        case 'increment':
            return { counter: state.counter + 1, showCounter: state.showCounter };
        case 'increase':
            return { counter: state.counter + action.amount, showCounter: state.showCounter };
        case 'decrement':
            return { counter: state.counter - 1, showCounter: state.showCounter };
        case 'toggle':
            return { showCounter: !state.showCounter, counter: state.counter };
        default:
            return state;
    }
};

const store = createStore(counterReducer);
export default store;

// -----------------------------------------------
// step-3 : subscirption and dispatching from the component
// src/componentts/Counter.js

import { useSelector, useDispatch } from 'react-redux';
const Counter = () => {
    const counter = useSelector((state) => state.counter);

    // HOW TO SUBSCRIBE FROM STORE
    const show = useSelector((state) => state.showCounter);

    // HOW TO DISPATCH AN ACTION FROM COMPONENT
    const dispatch = useDispatch();
    const incrementHandler = () => dispatch({ type: 'increment' });
    const increaseHandler = () => dispatch({ type: 'increase', amount: 10 });
    const decrementHandler = () => dispatch({ type: 'decrement' });
    const toggleCounterHandler = () => dispatch({ type: 'toggle' });

    return (
        <main className={classes.counter}>
            {show && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={increaseHandler}>Increase by 10</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;

// --------------- concept ------------------
/* 
All about redux:

redux work on principle of subscription and publishing 
components subscribe to central store of data.
Now if i want to publish some data, components cant directly publish data.
Components have to 'dispatch' some actions to reducers
Reducers are pure js functions which transforms some data and spits out new state (global store)
Reducers are pure js functions but which are called by redux library  and it will always receive two parameters - old state and action that was dispatched, It must always return a something(new state).
*/

const redux = require('redux')

const initialState = {
    counter: 0
}
const counterReducer = (oldState = initialState, action) => { // if we dont default to initial state, when redux executes this reducer for first time, then will we throw 'counter of undefined error'
    if(action.type === 'increment'){
        return {
            counter: oldState.counter + 1
        }
    }
    return oldState;
};

const store = redux.createStore(counterReducer) // it executes reducer first time redux is initialized. SO its important to given conditions in side reducer based on some actions 


const counterSubscriber =  () => {
    const latestState = store.getState() // getStore is a method created and given by createStore() which can be accessed on store object, it will give latest state snapshot of state that was updated.
    console.log(latestState);
}

store.subscribe(counterSubscriber);
store.dispatch({type: 'increment'})

/* 
when u use useSelector in a component, automatically that component is subscribed to the store.
when u use a useDispatch hook in component, we dont pass anything to it, but that hook will give us a dispatch function
 */
