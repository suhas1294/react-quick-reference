const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(users, { id: args.id });
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`).then(resp => resp.data)
            }
        }
    }
})


/*
    #Graphql query
    {
        company(id: "12"){
            name
        }
    }
*/

// schema.js
// http://localhost:3000/companies/12/users
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLlist(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then(res => res.data)
            }
        }
    }
});

// will get circular references error if try to make a query
/*
    #Graphql query
    {
        company(id: "12"){
            name,
            description,
            users{
                firstname
            }
        }
    }
*/
// hence wrap the fields object into a arrow function, closures resuces here.
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    // observe here
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLlist(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`).then(res => res.data)
            }
        }
    })
});


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLint },
        type: CompanyType,
        resolve(parentValue, args) {
            return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(res => res.data) // intermediate query - 2
        }
    })
});