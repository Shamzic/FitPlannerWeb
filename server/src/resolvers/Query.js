const { APP_SECRET, getUserId } = require('../utils')

async function feed(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {}

  const allLinks = await ctx.db.query.links({})
  const count = allLinks.length

  const queriedLinkes = await ctx.db.query.links({ first, skip, where })

  return {
    linkIds: queriedLinkes.map(link => link.id),
    count
  }
}

async function user(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  const userId = getUserId(ctx)
  const userMe = await ctx.db.query.user({ where: { id : userId  } })
  const name = userMe.name
  const email = userMe.email
  const firstname = userMe.firstname
  const lastname = userMe.lastname
  const age = userMe.age
  const city = userMe.city
  const weight = userMe.weight
  const height = userMe.height

  return {
	userId,
	name,
	email,
	firstname,
	lastname,
	age,
	city,
	weight,
	height
  }
}


async function muscle(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  //const userId = getUserId(ctx)
  console.log("Query muscle !!");
  console.log("Args.name :"+args.name);
  const muscle = await ctx.db.query.muscle({ where: { name : args.name }},
    `{
      id
      name
      type
      exercises {
        name
        imageUrl
      }
    }`
)

  const id  = muscle.id
  const name = muscle.name
  const type = muscle.type
  var exercises = muscle.exercises;
  return {
	id,
	name,
	type,
  exercises
  }
}

async function exercise(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  console.log("Query Ex !");
  console.log("Args.name :"+ args.name);
  var exercise = await ctx.db.query.exercise({ where: { name : args.name }},
    `{
      id
      name
      suggstfactor
      muscle {
        id
        name
        type
      }
    }`
  );
  var name = exercise.name;
  var suggstfactor = exercise.suggstfactor;
  var id = exercise.id;
  var  muscle = exercise.muscle;
  return {
  	exercise,
    suggstfactor,
    id,
    name,
    muscle
  }
}
//muscle:queriedmuscle.map(muscle => muscle.id)
//

async function suggst(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  console.log("Args.suggestfactor :"+ args.suggstfactor);
  const exercise = await ctx.db.query.exercise({ where: { suggstfactor : args.suggstfactor } })
  //const id = exercise.id
  //const name = exercise.name
  //const muscle = await ctx.db.query.muscle({ first, skip, where: { id:"cjoon536zoxz90a64isxxigb5" } })
  return {
	//name
	exercise
	//muscle
  }
}



module.exports = {
  feed,
  user,
  muscle,
  exercise,
  suggst
}
