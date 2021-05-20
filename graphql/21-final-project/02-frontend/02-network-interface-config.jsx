// whenever we execute a query or a mutation, by default graphql does not  attach cookies to our request

// index.js
import {createNetworkInterface} from 'pollo-client';

const networkInterface = createNetworkInterface({
    uri: "/graphql",
    // define options
    opts: {
        credentials: 'same-origin' // make requests to same origin that the browser is currently on., send cookies as well.
    }
});
// ApolloClient is the one which is actually making request to server
const client = new ApolloClient({
    // network interface is a code inside apollo client that is incharge of making other network calls to backend server.
    // create custom netweork client, instruct it whenever it sends a request to backend,make sure send along some cookie along with request.
    dataIDFromObject: o => o.id,
    networkInterface
});