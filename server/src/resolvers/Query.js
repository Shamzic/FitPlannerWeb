const { APP_SECRET, getUserId } = require('../utils')

async function feed(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {}

  const allLinks = await ctx.db.query.links({})
  const count = allLinks.length

  const queriedLinkes = await ctx.db.query.links({ first, skip, where })
  const queriedExercises = await ctx.db.query.exerciseExecutions({ first, skip, where })

  return {
    linkIds: queriedLinkes.map(link => link.id),
    exerciseExecutionIds: queriedExercises.map(exercise => exercise.id),
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
      imageUrl
      muscle {
        id
        name
        type
      }
    }`
  );
  var name = exercise.name;
  var imageUrl = exercise.imageUrl;
  var suggstfactor = exercise.suggstfactor;
  var id = exercise.id;
  var  muscle = exercise.muscle;
  return {
  	exercise,
    suggstfactor,
    id,
    name,
    imageUrl,
    muscle
  }
}
//muscle:queriedmuscle.map(muscle => muscle.id)
//

async function suggst(parent, args, ctx, info) {
  const { filter, first, skip } = args
  console.log("Args.suggestfactor :"+ args.suggstfactor);
  console.log("Args.suggestfactor :"+ args.name);
  console.log("Args.suggestfactor :"+ args);
  console.log("Args.suggestfactor :"+ parseFloat(1));
  var exercise = await ctx.db.query.exercises({ where: { suggstfactor : parseFloat(1) } },
  `{
      id
      name
	  imageUrl
      suggstfactor
      muscle {
        id
        name
        type
      }
    }`
  );
  var name1 = exercise.name;
  var suggstfactor = exercise.suggstfactor;
  var id = exercise.id;
  var  muscle = exercise.muscle;
  console.log("esssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllllluuuuuuuuutttttttttttttttt");
  console.log(exercise);
  console.log("cccccccccccccccccoooooooooooooooooooooouuuuuuuuuuuuuuuuuuuuuuccccccccccccccooooooooooooooooouuuuuuuuuuu");
  console.log(exercise.map(exercise=>exercise.name))
  console.log(exercise.map(exercise=>exercise.imageUrl))
  return {
	names : exercise.map(exercise=>exercise.name),
	urls : exercise.map(exercise=>exercise.imageUrl)
  }
}

module.exports = {
  feed,
  user,
  muscle,
  exercise,
  suggst,
}
