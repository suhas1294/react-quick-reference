// There may not be one single page/component that you may want to load.
// instead, inside of a page tou may want to have a route

// expected url: https://example.com/welcome/some-new-user
// You can define Route component whereever you want - it is not limited to one single place in app
import {Route} from 'react-router-dom';

// If a route component is on a component which is active they will be evaluated by react-router-dom
export default Welcome = props => {
    <section>
        {/* this Route will be evaluated if Welcome Component is active , for example:*/}
        {/* /products could never become active because we can never be on welcome page for a path starts with /products */}
        <Route path="/products"></Route>
        {/* Now below route will be active if you are on welcome page */}
        {/* Now Whatever between is between these two route tags would be loaded as well */}
        {/* you can use other component or jsx code inline  */}
        <Route path="/welcome/new-user"></Route>
        {/* for example :*/}
        <Route path="/welcome/new-user">
            <p>Welcome new user</p>
        </Route>
        <h1>Welcome page</h1>
    </section>
}