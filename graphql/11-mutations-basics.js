// schema.js
/* 
    // Skeleton
    const mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            addUser: {
                type: ,
                args: ,
                resolve(){
                    
                }
            }
        }
    }) 
*/

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
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
 });