const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://groupeFitPlanner:mdpFitPlanner1234@ds159263.mlab.com:59263/fitplanner')
mongoose.connection.once('open',() =>{
	console.log('connect to database')
})

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
