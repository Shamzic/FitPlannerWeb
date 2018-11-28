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


async function updateUser(parent, args, ctx, info) { 
 console.log("args");
  console.log(args);
  const tmpUser = {};
  const { data, where}=args

  
  const userId = getUserId(ctx)

  const userMe  = await ctx.db.query.user({ where: { id : userId  } })
  tmpUser.id = userMe.id
  if(data.name!=''){tmpUser.name = data.name;}else{tmpUser.name = userMe.name;}
  if(data.email!=''){ tmpUser.email = data.email;}else{tmpUser.email = userMe.email;} 
  if(data.lastname!=''){ tmpUser.lastname = data.lastname;}else{tmpUser.lastname = userMe.lastname;} 
  if(data.firstname!=''){ tmpUser.firstname = data.firstname;}else{tmpUser.firstname = userMe.firstname;} 
  if(data.age!=''){ tmpUser.age = data.age;}else{tmpUser.age = userMe.age;} 
  if(data.city!=''){ tmpUser.city = data.city;}else{tmpUser.city = userMe.city;} 
  if(data.weight){ tmpUser.weight = data.weight;}else{tmpUser.weight = userMe.weight;} 
  if(data.height){ tmpUser.height = data.height;}else{tmpUser.height = userMe.height;} 



  console.log(ctx.db.mutation.updateUser({data:{user : tmpUser,},},{where:{ id : userId  }},));




  return ctx.db.mutation.updateUser(
	
	{
		data:{
		
			name : tmpUser.name,
			email : tmpUser.email,
			lastname : tmpUser.lastname,
			firstname : tmpUser.firstname,
			age : tmpUser.age,
			city : tmpUser.city,
			weight : tmpUser.weight,
			height : tmpUser.height,
	  },
		where:{ id : userId }
	}
  )
}

module.exports = {
  post,
  signup,
  login,
  vote,
  updateUser,
  postm

}
