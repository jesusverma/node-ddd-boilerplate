const { Router } = require('express')
const Status = require('http-status')

const UserCreate = require('src/command/UserCreate')
const UserGetAll = require('src/assembler/UserGetAll')

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true })

  router.get('/', async (req, res, next) => {
    const t = await database.transaction()
    try {
      const payload = {
        parent: req.query.parent || false,
        q: req.query.q,
        page: req.query.page || 1,
        size: req.query.size || 10,
      }
      const { user, pagination } = await UserGetAll(
        payload,
        req.context,
        t,
        repository,
      )
      await t.commit()
      res.status(Status.OK).json(output.success(user, pagination))
    } catch (e) {
      await t.rollback()
      next(e)
    }
  })

  router.post('/', async (req, res, next) => {
    const t = await database.transaction()
    try {
      const payload = { ...req.body }
      const user = await UserCreate(payload, req.context, t, repository)
      await t.commit()
      res.status(Status.OK).json(output.success(user))
    } catch (e) {
      await t.rollback()
      next(e)
    }
  })

  return router
}
