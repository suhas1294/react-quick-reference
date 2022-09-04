/* custom action creator / redux thunk :

So when we are using redux-toolkit, We knew that for dispatching, we do this:
dispatch(somefunc()) which will ideally return an object like this : {type: '', payload: {}}

But, We can also execute a function inside dispatch function - which will return a function instead of above object. that function will get dispatch as argument (managed by redux)

So what will that function do ?
ex:
dispatch(someOtherFunc()) */

const someOtherFunc = (customPayload) => {
    return async (dispatch) => { // note that , the function u are returning can also be async

        // step-0 : optional (in case there are multiple dispatches along with side effect)
        dispatch(compActions.showNotifications({
            status: 'pending',
            title: 'wait !',
            msg: 'wait for some time !'
        }))

        // step-1 : perfirm some async tasks
        const getData = async () => fetch('https:// example.com/posts')
        const resp = await getData()

        if(!resp.ok){
            dispatch(compActions.showNotifications({
                status: 'success',
                title: 'yeah !',
                msg: 'its done buddy !!'
            }))
        }

        const data = await resp.json()
        try{
            // do something with above data, probably update in redux store by using one more dispatch
            dispatch(currentReducerActions.updateDataFromServer({data: {...data, extra: customPayload}}))
        }catch(error){
            dispatch(compActions.showNotifications({
                status: 'error',
                title: 'oh no!',
                msg: 'Try once more !'
            }))
        }
    }
}
