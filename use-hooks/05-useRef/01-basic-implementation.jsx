import React, { useRef } from 'react';

const UserCreateForm = props => {

    const nameInputRef = useRef();

    const addUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        // do buisness logic with 'enteredName'
    }

    return (
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <Button type="submit">Add User</Button>
        </form>
    )
}