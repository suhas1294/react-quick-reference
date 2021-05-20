import getCurrentuser from './queries/current_user';
import { useHistory } from 'react-router-dom';

const LOGIN_USER = gql`
    login(email, password){
        id
        email
    }
`;

export default LoginForm = props => {
    
    const history = useHistory();

    const [errors, setErrors] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const [loginUser, { data }] = useMutation(LOGIN_USER);
    const { loading, error, data } = useQuery(getCurrentuser);

    // if (data && data.user){ // data.user will be null when login page is first laoded.
    if (data){
        setCurrentUser(data.user);
    }

    submitHandler = ({ email, password }) => {
        loginUser({
            variables: { email, password },
            refetchQueries: () => [{ 
                query: getCurrentuser,
                // variables: {
                //     remember_me: true
                // }
            }]
        })
        .then(res => {

        })
        .catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            setErrors(errors)
        })
    }

    useEffect(() => {
        history.push("/dashboard");
        return () => {
            // cleanup
        }
    }, [currentUser])

    return(
        <div>
            <h3>Login</h3>
            <AuthForm errors = {errors} onSubmit={submitHandler} />
        </div>
    )
}