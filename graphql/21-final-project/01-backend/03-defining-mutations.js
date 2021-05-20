// src/schema/mutations.js
const graphql = require('graphql')
const {
    GraphqlObjectType,
    GraphQLString
} = graphql;
const UserType = require("./types/user_type");
const AuthService = require('../services/auth'); // this is a passport-graphql glue helper functions

const mutation = new GraphqlObjectType({
    name: "Mutation",
    fields: {
        signup: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            // third argument is called request OR context - its request object coming from express.
            // resolve(parentValue, args, request){
            resolve(parentValue, {email, password}, req){
                return AuthService.signup({email, password, req});
            }
        }
    }
});

module.exports = mutation;