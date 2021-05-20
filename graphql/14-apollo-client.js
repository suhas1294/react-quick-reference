// clone this supporting backend code : https://github.com/StephenGrider/Lyrical-GraphQL

// backend server <-----> Apollo store <------> [Provider(React App)]
// Apollo store does not know whether we are using react/ angular/ whatever.
// Apollo store is what is going to directly communicate with graphql server and store data that comes back from it.
// So its a store of data that exists in the client side.

// Provider will take data from store and inject it to our react app, its a glue layer.

// index.js in react app
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-appollo';

// this line assumes that in the express app there is an enpoint called '/graphql'
const client = new ApolloClient({});

const Root  = () => {
    return(
        <ApolloProvider client={client}>
            <div>Some heading</div>
        </ApolloProvider>
    )
}


 