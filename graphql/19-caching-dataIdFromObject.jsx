// src/index.js
const client = new ApolloClient({
    // this code takes every single peice of data that is fetched by 
    // our client from backend and run it through this function.
    // result of this function is used to identify that peice of data in apollo store.
    dataIdFromObject: o => o.id
});

//  https://dev.apollodata.com/react/cache-updates.html