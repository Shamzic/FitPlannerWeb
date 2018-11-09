const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema} = graphql;

var exercises = [
  {name:'Pompes classiques', genre: 'Poids du corps', id:'1', numberOfUsers: 0},
  {name:'Pompes diamant', genre: 'Poids du corps', id:'2', numberOfUsers: 4},
  {name:'Soulevé de terre', genre: 'Fonte', id:'3', numberOfUsers: 3}
];

const ExerciseType = new GraphQLObjectType({
  name: 'Exercise',
  fields : () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString },
    numberOfUsers: {type: GraphQLInt}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields : () => ({
    exercise: {
      type: ExerciseType,
      args: {id: {type: GraphQLString}},
      resole(parent, args) {
        // code to get data from db
        return _.find(exercises, {id: args.id});
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
