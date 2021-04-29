// MyComponent.jsx file
import React from 'react';
const MyComponent = props => {
    return(
        <>
            <p>Some JSX code</p>
            <NestedComponent />
        </>
    )
}

// this is for functional components
export default React.memo(MyComponent);

// ----------------------------------------

// IMPORTANT : Now when SomeComponent re-rendered in DOM, unless there are 
// prop changes in MyComponent, MyComponent will not be re-rendered since
// we have used React.memo on it.
// BUT When prop type is a function (as compared with string, boolean, number),
// React.memo does not work, hence we have to use 'useCallback' instead.
// Basically when a component gets re-rendered, its functions (ex: some handler function)
// is re-created, to avoid this we use 'callBack'

// Someother.jsx file
const SomeComponent = props => {
    return(
        <>
            <MyComponent />
            <YetAnotherComponent />
        </>
    )
}

