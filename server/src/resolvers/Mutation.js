const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const { Query } = require('react-apollo')

function post(parent, { url, description }, ctx, info) {
  const userId = getUserId(ctx)
  return ctx.db.mutation.createLink(
    { data: { url, description, postedBy: { connect: { id: userId } } } },
    info,
  )
}

async function signup(parent, args, ctx, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await ctx.db.mutation.createUser({
    data: { ...args, password },
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, ctx, info) {
  const user = await ctx.db.query.user({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

async function vote(parent, args, ctx, info) {
  const { linkId } = args
  const userId = getUserId(ctx)
  const linkExists = await ctx.db.exists.Vote({
    user: { id: userId },
    link: { id: linkId },
  })
  if (linkExists) {
    throw new Error(`Already voted for link: ${linkId}`)
  }

  return ctx.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: linkId } },
      },
    },
    info,
  )
}


function postm(parent, { name, type }, ctx, info) {
  const userId = getUserId(ctx)
  return ctx.db.mutation.createMuscle(
    { data: { name, type } },
    info,
  )
}


async function updateUser(parent, args, ctx, info) { //user

  const tmpUser = {};
  const { name, email } = args
  const userId = getUserId(ctx)

  const userMe  = await ctx.db.query.user({ where: { id : userId  } })
  tmpUser.id = userMe.id
  if(name!='')tmpUser.name = name;
  if(email!=''){ tmpUser.email = email;}else{tmpUser.email = userMe.email;} //else userMe.email
  tmpUser.password = userMe.password;
  console.log("test1");
  console.log(userMe.id);
  console.log(userMe);
  console.log(tmpUser.name);
  console.log(tmpUser.email);
  console.log(tmpUser);
  console.log(typeof tmpUser);
  console.log(typeof ctx.db.mutation.updateUser({data:{user : tmpUser,},},{where:{  }},));
  console.log(typeof {	data:{user : tmpUser,},});
  console.log(name);



  return ctx.db.mutation.updateUser(
	{
	  data:{
		//user : {
			//id : userMe.id,
			//name : tmpUser.name,
			//email : tmpUser.email,
			//password: tmpUser.password,
		//},
		user : tmpUser,
	  },
	},
	{where:{  }},//id : userId
  )
  console.log("bien executer");
}

module.exports = {
  post,
  signup,
  login,
  vote,
  updateUser,
  postm

}
