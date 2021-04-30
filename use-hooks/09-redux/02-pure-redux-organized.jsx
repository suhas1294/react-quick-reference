// folder structure
/* 
    src
        components
            MyComponent.jsx
        store
            actions
                feature_1.js
                feature_2.js
                action_types.js
                index.js
            reducers
                feature_1.js
                feature_2.js
        index.js
        App.js
 */

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// src/App.js

// importing necessary libraries for redux implementation
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// importing reducers
import globalReducer from './store/reducers/global';
import peopleReducer from './store/reducers/people';

// combining reducers and creating store with root reducer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    globalReducer: globalReducer,
    peopleReducer: peopleReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// src/store/actions/action_types.js
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const DO_AUTHENTICATE = 'DO_AUTHENTICATE';

export const GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES';
export const GET_ALL_EMPLOYEES_ASYNC = 'GET_ALL_EMPLOYEES_ASYNC';


// --------------------------------------------------------------------
// --------------------------------------------------------------------
// src/store/actions/feature_1.js
import * as actionType from './actionTypes'

export const isAuthenticated = () => {
    return { type: actionType.IS_AUTHENTICATED }
}

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// src/store/actions/feature_2.js
import * as actionType from './actionTypes';

const getAllEmployees = (empList) => {
    return {
        type: actionType.GET_ALL_EMPLOYEES,
        empList: empList
    }
}

// doing side effect, need to use redux thunk
export const getAllEmployeesAsync = () => {
    const payload = { getSalaryDetails: true, getOrgDetails: true }
    return (dispatch) => {
        axios.post('/some-end-point', payload)
            .then(response => {
                dispatch(getAllEmployees(response.data.data.queryUser))
            })
            .catch(err => console.error("Errow while fetching data, err : {}", err));
    };
}


// --------------------------------------------------------------------
// --------------------------------------------------------------------
// src/store/actions/index.js
export {
    isAuthenticated,
    doAuthenticate
} from './feature_1'

export {
    getAllEmployeesAsync,
    addNewEmployeeAsync
} from './feature_2'


// --------------------------------------------------------------------
// --------------------------------------------------------------------
// src/store/reducers/feature_1.js
import * as actionType from './../actions/actionTypes';
const initialState = { isUserAuthenticated: false, userDetails: {} };
// REDUCER
const featureOneReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.IS_AUTHENTICATED: return isUserAuthenticated(state);
        case actionType.DO_AUTHENTICATE: return doAuthenticate(state, action.user);
        default: return state;
    }
}
// HELPER FUNCTIONS
const isUserAuthenticated = (state) => {
    if (localStorage.getItem('userId')) {
        return { ...state, isUserAuthenticated: true }
    }
}
export default featureOne;


// --------------------------------------------------------------------
// --------------------------------------------------------------------
// src/store/reducers/feature_2.js
import * as actionType from './../actions/actionTypes';
const initialState = { empList: [] };
const featureTwoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_ALL_EMPLOYEES: return getEmpList(state, action.empList);
        default: return state;
    }
};
const getEmpList = (state, empList) => { return { ...state, empList: empList } }
// src/store/actions/action_type.js
export default featureTwo;

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// src/components/MyComponent.jsx
import { connect } from 'react-redux';

class MyComponent extends Component {
    render() {
        if (!this.props.isUserSignedIn) {
            return (<Redirect to="/" />);
        }
        if (isAuthenticated) {
            this.props.doAuthenticate(user);
        }
        return (<p>dashboard</p>);
    }
}

const mapStateToProps = state => {
    return {
        isUserSignedIn: state.globalReducer.isUserAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doAuthenticate: (user) => dispatch(actions.doAuthenticate(user)),
        isUserAuthenticated: () => dispatch(actions.isAuthenticated())
    }
}
connect(mapStateToProps, mapDispatchToProps)(MyComponent)