// src/index.js
import ApolloClient from 'apollo-clinet';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
    // allows apollo-client to uniquely identify every record that we fetch
    dataIdFromObject: o => oid
});

const Root = () => {
    return(
        <ApolloProvider client={client}>
            <div>Hello</div>
        </ApolloProvider>
    )
}

// apollo-client does not know anything about react
// react-apollo is the one which communicates between react app and apollo client
