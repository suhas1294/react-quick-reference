// inside src/schema/types/root_query_type.js
const UserType = require("./02-user-type");

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // return currently authenticated user
        user: {
            type: UserType,
            resolve(parentValue, args, req){
                req.user; // this will be auto populated by user, graphql returns null if this object is not present
            }
        }
    }
});


// graphql:

/* 
    // mimic signinig in.
    mutation{
        login(email: "test@test.com", password: "test"){
            email
        }
    }

    // this should give success status for login. i.e., user email should be returned
    {
        user{
            email
        }
    }
    
    // mimic signinig out.
    mutation{
        logout{
            email
        }
    }
    
    // this should return null
    {
        user{
            email
        }
    }
*/