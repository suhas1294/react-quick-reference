const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // by default graphql always expects to have atlest one field available for every single defined type
    dummyField: {type: GraphQLID}
  }
});

module.exports = RootQueryType;