import { databaseClient } from '../../tina/__generated__/databaseClient'
import withTinaAuth from '../../tina/auth'

async function handler(req, res) {
  const { query, variables } = req.body
  const result = await databaseClient.request({
    query,
    variables,
    user: req.session?.user,
  })
  return res.json(result)
}

export default withTinaAuth(handler)
