// schema.js
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: { type: GraphQLString }},
            resolve(parentValue, args){
                /* 
                    resolve function cal also work by returning a promise,
                    if we return a promise from resolve function, graphql will
                    automatically detect that we returned the promise, wait for promise to reoslve
                    and then once its does, grab the resolved data and return response back to user.
                */
               // return fetch(`http://localhost:3000/users/${args.id}`)
               return axios.get(`http://localhost:3000/users/${args.id}`).then(resp => resp.data)
            }
        }
    }
})