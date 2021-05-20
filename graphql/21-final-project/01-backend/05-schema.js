const graphql = require('graphql')
const {GraphQLSchema} = graphql;

const RootQueryType = require('./types/root_query_type');
const mutation = require('./mutations');

modules.export = new GraphQLSchema({
    query: RootQueryType,
    mutation
});