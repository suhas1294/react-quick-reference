const [errors, setErrors] = useState([])

submitHandler = ({ email, password }) => {
    props.mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
    })
    .then(res => {

    })
    .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        setErrors(errors)
    })
}

/*
    1. User clicks on sign in after entering credentials.
    2. user is redirected to Dashboard, Simultaneously refetchQueries will be executed.
    3. User enters dashboard, dashboard says user not yet signed in since refetch query is not yet completed.
    4. Now after some time referch query is completed which says user is authenticated and now user will be redirected to dashboard.

    To avoid above flow, we need to make sure, after refecth query is executed and user is authenticated, he is redirected to dashboard.

    Important: Application wide we have 'queries', SO when query reruns - We update all components assiciated with it.

    So new flow will be:
    1. assicuate sign up/sign in form with a query (that returns response which says whether user is signedin or not)
    2. login user mutation runs
    3. refetch current user
    4. login for rerenders with current user.
    5. redirect user to dashboard
    6. dashboard ensures auth state.
*/