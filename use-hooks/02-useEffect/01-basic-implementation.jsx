import {useEffect} from 'react';

// componentDidMount
// runs only for first time
useEffect(() => {
    console.log('useEffect called!');
    setTimeout(() => {
        alert("hi")
    }, 1000);
}, []); // send empty array

// ------------------------------------------------------------
// componentDidUpdate
//
useEffect(() => {
    console.log('useEffect called!');
    setTimeout(() => {
        alert("hi")
    }, 1000);
}, [props.persons]); // send attributes whose value has to be checked, dont send the entire object

// ------------------------------------------------------------

// componentWillUnmount - 1
// when component gets destroyed
useEffect(() => {
    console.log('useEffect called!');

    let t = setTimeout(() => {
        alert("hi")
    }, 1000);
    
    // return does a clean up job
    // its run before the component is re-rendered again
    // first time its not run.
    return () => {
        t.clearTimeout();
    }
}, []);

// componentWillUnmount - 2 (with dependency)
// when component gets destroyed
useEffect(() => {
    console.log('useEffect called!');
    let t = setTimeout(() => {
        alert("hi")
    }, 1000);
    // return clean up function
    return () => {
        clearTimeout(t);
    }
}, [props.persons]);

// componentWillUnmount - 3
// in case some operation that needs to be cancelled when every component re-renders
useEffect(() => {
    console.log('useEffect called!');
    let t = setTimeout(() => {
        alert("hi")
    }, 1000);
    // return clean up function
    return () => {
        t.clearTimeout();
    }
});

// ------------------------------------------------------------
// IMPORTANT : NEVER use 'async' function inside useEffect

// ex: NEVER DO THIS:
useEffect( async () => {

}, [])

// YOU CAN DO THIS INSTEAD:
useEffect( () => {
    const sideEffect = async () => {
        return fetch("https://someurl.com");
    }
    try{    
        sideEffect()
            .then(console.log("execute buisness logic"))
            .catch(console.log('do some error handling'))
    }catch(error){
        console.log("something went wrong");
    }

}, [])