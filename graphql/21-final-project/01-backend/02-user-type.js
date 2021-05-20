// src/schema/types/user_type.js
const graphql = require('graphql')
const {
    GraphqlObjectType,
    GraphQLString
} = graphql;

const UserType = new GraphqlObjectType({
    name: "UserType",
    fields: {
        // never expose password field in schema
        email: {type: GraphQLString}
    }
});

module.exports =  UserType;