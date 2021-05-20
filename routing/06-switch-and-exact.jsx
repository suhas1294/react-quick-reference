// app.js
export function App(){
    return(
        <div>
            <Route path="/welcome"><Welcome /></Route>
            {/* 
                we have a problem here in below teo routes, both components will
                be if we navigate to https://example.com/products/p2
                We need to have only one active routes at the same time.
            */}
            <Route path="/products"><Products /></Route>
            <Route path="/products/:pid"><ProductDetail /></Route>
        </div>
    )
}

// to solve above issue, use Switch component from react
// app.js
import {Switch} from 'react-router-dom';
export function App(){
    return(
        <div>
            {/* 
                Now we wrap all route component with switch component
                Now only one matching route will be active at a time THAT WHICH MATCHES FIRST
                Now if we navigate to https://example.com/products/p2
                Only Products page will be rendered and not product-details page
                Possible solutions:
                1. change the order of defining routes
                2. use exact-keyword
            */}
            <Switch>
                <Route path="/welcome"><Welcome /></Route>
                <Route path="/products"><Products /></Route>
                <Route path="/products/:pid"><ProductDetail /></Route>
            </Switch>
        </div>
    )
}

// possible solution 1
export function App(){
    return(
        <div>
            <Switch>
                <Route path="/welcome"><Welcome /></Route>
                <Route path="/products/:pid"><ProductDetail /></Route>
                <Route path="/products"><Products /></Route>
            </Switch>
        </div>
    )
}

// possible solution 2
export function App(){
    return(
        <div>
            <Switch>
                <Route path="/welcome"><Welcome /></Route>
                <Route path="/products" exact><Products /></Route>
                <Route path="/products/:pid"><ProductDetail /></Route>
            </Switch>
        </div>
    )
}