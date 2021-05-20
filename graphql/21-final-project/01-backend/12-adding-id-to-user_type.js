const UserType = new GraphqlObjectType({
    name: "UserType",
    fields: {
        // never expose password field in schema
        id: {type: GraphQLID},
        email: {type: GraphQLString}
    }
});