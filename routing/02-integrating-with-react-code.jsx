//  Route is a component that allows us to define a certain path and then the react 
// component that should be loaded when the path becomes active in url
import {Route} from 'react-router-dom';
import Welcome from './components/Welcome';
import Products from './components/Products';


export function App(){
    return(
        <div>
            {/* we register a route */}
            <Route 
                // this route should become active if we have /welcome in the path
                // and define which component should be rendered
                path="/welcome"
            >
                <Welcome />
            </Route>
            
            <Route path="/products"><Products /></Route>
        </div>
    )
}


// src/index.js
import BrowserRouter from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

/*
    folder structure:
    src
        pages
            components
            A.jsx
            B.jsx
            .
            .
*/