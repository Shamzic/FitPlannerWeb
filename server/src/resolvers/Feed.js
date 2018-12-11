const { APP_SECRET, getUserId } = require('../utils')
function links(parent, args, context, info) {
  const { linkIds } = parent
  return context.db.query.links({ where: { id_in: linkIds } }, info)
}

function exerciseExecutions(parent, args, context, info) {
  const { exerciseExecutionIds } = parent
  const userId = getUserId(context)
  return context.db.query.exerciseExecutions({ where: { id_in: exerciseExecutionIds, user: {id: userId}}},
  `{
    id
    series
    repetitions
    user{
      id
      name
    }
    exercise {
      id
      name
    }
  }`)
}

module.exports = {
  links,
  exerciseExecutions
}
