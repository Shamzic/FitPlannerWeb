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
  const email = userMe.email //"sdfghjklmù"//await ctx.db.query.user.email//"blabla"

  return {
	userId,
	name,
	email
  }
}


async function muscle(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  //const userId = getUserId(ctx)
  console.log("Query muscle !");
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
  const exercice = await ctx.db.query.exercice({ where: { name : args.name  } })
  const id = exercice.id
  const name = exercice.name
  const muscle = exercice.muscle

  return {
	id,
	name,
	muscle
  }
}

//

module.exports = {
  feed,
  user,
  muscle,
  exercice
}
