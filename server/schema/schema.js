const graphql = require('graphql');
const _ = require('lodash');
const User = require('../models/user');

const {GraphQLObjectType, 
	GraphQLString, 
	GraphQLInt, 
	GraphQLSchema,
	GraphQLFloat,
	GraphQLDate,//npm i --save graphql-date
	GraphQLList,
	GraphQLID,
	GraphQLNonNull
} = graphql;

var exercises = [
  {name:'Pompes classiques', genre: 'Poids du corps', id:'1', numberOfUsers: 0},
  {name:'Pompes diamant', genre: 'Poids du corps', id:'2', numberOfUsers: 4},
  {name:'Soulevé de terre', genre: 'Fonte', id:'3', numberOfUsers: 3}
];


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        firstname: { type: GraphQLString },
        username: { type: GraphQLString },
		birthDate: { type: GraphQLDate },//npm i --save graphql-date
		mail: { type: GraphQLString },
		city: { type: GraphQLString },
		weight: { type: GraphQLFloat },
		height: { type: GraphQLFloat },
		friends:{
			type : new GraphQLList(UserType),
			resolve(parent, args){
				return User.findById(parend.friendId);
			}
		}
    })
});


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
    },
	user: {
      type: UserType,
      args: {id: {type: GraphQLString}},
      resole(parent, args) {
        // code to get data from db
        return _.find(User, {id: args.id});
      }
    }
  })
});


const Mutation =new GraphQLObjectType({
	name: 'Mutation',
	fields:{
		addUser:{
			type: UserType,
			args:{
				name: {type: new GraphQLNonNull(GraphQLString)},
				firstname: {type: new GraphQLNonNull(GraphQLString)},
				username: {type: new GraphQLNonNull(GraphQLString)},
				birthDate: {type: new GraphQLNonNull(GraphQLInt)},
				mail: {type: new GraphQLNonNull(GraphQLString)},
				city: {type: new GraphQLNonNull(GraphQLString)},
				weight: {type: GraphQLFloat},
				height: {type: GraphQLFloat},
			},
			resolve(parent,args){
				let user = new User({
					name: args.name,
					firstname: args.firstname,
					username: args.username,
					birthDate: args.birthDate,
					mail: args.mail,
					city: args.city,
					weight: {type: GraphQLFloat},
					height: {type: GraphQLFloat},
				});
				return user.save();
			}
		}
		
		
	}
});


module.exports = new GraphQLSchema({
  query: RootQuery
});
