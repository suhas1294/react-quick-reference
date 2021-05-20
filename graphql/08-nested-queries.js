// schema.js
// order of defining schema is important
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString} 
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLint},
        // compantId: {type: CompanyType} : why not ?
        company: {
            type: CompanyType,
            // here we are using resolve function because json server is returning companyId and 
            // graphql is expecting company, hence we need to say graphql how to fetch company by defining logic in resolve method
            resolve(parentValue, args){
                // console.log(parentValue, args) // intermediate query - 1
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`).then(res => res.data) // intermediate query - 2
            }
        }
    }
});

// execute following in localhost:4000/graphql
// intermediate query - 1
/* 
    {
        user(id: 23){
            firstName,
            company{
                id
            }
        }
    }
*/


// intermediate query - 2
/* 
    {
        user(id: 23){
            firstName,
            company{
                name,
                description
            }
        }
    }
*/
