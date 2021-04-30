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