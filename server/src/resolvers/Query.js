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
  /* const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {}

  const allLinks = await ctx.db.query.links({}) //peut etre link pour 
  const count = allLinks.length
  

  const queriedLinkes = await ctx.db.query.links({ first, skip, where })
   */
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


module.exports = {
  feed,
  user,
}
