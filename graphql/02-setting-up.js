const express = require('express');
const expressGraphQL = require('express-graphql'); // compatibality b/w express and graphql

const schema = require('./03-schema');

const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema
}))

app.listen(4000, () => {
    console.log('listening');
})

// node app.js
// http://localhost:4000/graphql
// {"errors":[{'messages':'GraphQL middleware options must contain a schema'}]}
//  inform graphql about how the data in our application is arranged and how can be accessed.
// we do all these inside of a schema file
// schema defines variaous tables and relationship b.w the table