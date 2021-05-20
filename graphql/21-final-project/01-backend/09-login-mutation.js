// continuation in src/schema/mutations.js

const UserType = require("./02-user-type");

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
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req){
                const {user} = req;
                req.logout(); // its a paasport method to logout the user, check passport documentation
                return user;
            }
        },
        login: {
            // 1. here is what is returns
            type: UserType, 
            
            // 2. here is what is expects to have
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },

            // 3. here is what mutation does or what it calls
            resolve(parentValue, {email, password}, req){
                return AuthService.login({email, password, req});
            }
        }
    }
});