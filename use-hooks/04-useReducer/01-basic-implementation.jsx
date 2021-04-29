import React, { useState, useEffect, useReducer } from 'react';

// syntax:
// useReducer(reducer_function, initial_state)

// step-1 declare initial state
const initialState = {
    value: '',
    isValid: null,
}

// step-2 create a reducer
const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }
    // return default state
    return { value: '', isValid: false };
};

export const MyComponent = props => {

    // step-3 initialise reducer with reducer function and initial state
    const [emailState, dispatchEmail] = useReducer(emailReducer, initialState)

    // step-4 dispatching an action (to manipulate state)
    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
        setFormIsValid(event.target.value.includes('@'));
    };

    // step-5 : utilizing the state 
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        setFormIsValid(emailState.isValid); // here
    };

    // returning jsx
    <form onSubmit={submitHandler}>
        <input
            type="email"
            id="email"
            //state can be utilised here as well
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
    </form>

}