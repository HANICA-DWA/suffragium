const checkVote = (req, res, next) => {
  const { logged, duplicationChecking } = req.body
  const { pollId } = req.params
  if (duplicationChecking !== "none" && req.session.votes.includes(/*pollId*/)) {
    res.status(401).send({ error: 'Already voted!' })
  }
  else next()
}

module.exports = checkVote
