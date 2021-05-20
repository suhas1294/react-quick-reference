const [errors, setErrors] = useState([])

submitHandler = ({email, password}) => {
    props.mutate({
        variables: {email, password}
    }).catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        setErrors(errors)
    })
}