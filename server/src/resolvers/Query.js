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
  var muscleName = "biceps";
  const muscle = await ctx.db.query.muscle({ where: { name : muscleName } })//args.email"rachel.noireau@orange.fr"
  const mid  = muscle.id
  const name = muscle.name
  const type = muscle.type

  return {
	mid,
	name,
	type
  }
}

//

module.exports = {
  feed,
  user,
  muscle
}
