const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {type: GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLInt)},
                companyId: {type: GraphQLNonNull(GraphQLString)}
            },
            // resolve(parentValue, args){
            resolve(parentValue, {firstName, age}){
                axios.post(`http://localhost:3000/users`, {firstName, age}).then(res => res.data)
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, {id}){
                return axios.delete(`http://localhost:3000/users/${id}`).then(res => res.data)
            }
        }
    }
});