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
  const userMe = await ctx.db.query.user({ where: { id : userId  } })//args.email"rachel.noireau@orange.fr"
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
  const muscle = await ctx.db.query.muscle({ where: { name : args.name } })//args.email"rachel.noireau@orange.fr"
  const mid  = muscle.id
  const name = muscle.name
  const type = muscle.type
  

  return {
	mid,
	name,
	type
  }
}

async function exercice(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  console.log("Query Ex !");
  console.log("Args.name :"+ args.name);
  const muscle = await ctx.db.query.muscle({ where: { name : args.name } })//args.name
  const id = muscle.id
  console.log("Args.id :"+id);
  //const name = exercice.name
  const exercice = await ctx.db.query.exercice({ first, skip, where: { muscle : id } })
  return {
	id,
	name,
	//muscle
	
  }
}
//muscle:queriedmuscle.map(muscle => muscle.id)
//

async function suggst(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  console.log("Args.suggestfactor :"+ args.suggstfactor);
  const exercice = await ctx.db.query.exercice({ where: { suggstfactor : args.suggstfactor } })
  //const id = exercice.id
  //const name = exercice.name
  //const muscle = await ctx.db.query.muscle({ first, skip, where: { id:"cjoon536zoxz90a64isxxigb5" } })
  return {
	//name
	exercice
	//muscle
  }
}



module.exports = {
  feed,
  user,
  muscle,
  exercice,
  suggst
}
