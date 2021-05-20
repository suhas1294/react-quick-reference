// contains all data that tells graphql exactly what your application 
// data looks like what properties each object has 
// exactly how each object is related with each other

const graphql = require('graphql');
const _ = require('lodash'); // helper library for working on collection data

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLint,
    GraphQLSchema
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLint} 
    }
});

// hardcoded users instead of using actual database
const users = [
    {id: '22', firstName: 'Bill', age: 34},
    {id: '35', firstName: 'John', age: 45},
    {id: '34', firstName: 'Doe', age: 56}
]
// Concept of RootQuery: entry point into our application/data 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // anyone comes into our app asking for a particular user, 
    // probably they are asking about user type we created.
    // 
    fields: {
        user: { // if you are looking for an user
            type: UserType, // will return a User type in response
            args: {id: { type: GraphQLString }}, // when you pass id as arguments
            // resolve method does actual finding in data, returns actual piece of data
            // parentValue is rarely used
            resolve(parentValue, args){
                // return users.filter(u => u.id === args.id)
                return _.find(users, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
   query: RootQuery 
});