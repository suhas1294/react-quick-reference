// if i navigate to some unregistered route, i dont see anything on screen.
// we need to redrect user to our home page.

import { Redirect } from 'react-router-dom';

export function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/welcome" />
                </Route>
                <Route path="/welcome"><Welcome /></Route>
                <Route path="/products" exact><Products /></Route>
                <Route path="/products/:pid"><ProductDetail /></Route>
            </Switch>
        </div>
    )
}