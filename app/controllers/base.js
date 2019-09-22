const loadController = (model, createCb) => {
  const load = (req, res, next, id) => {
    model
      .findByPk(id)
      .then(resource => {
        req.dbResource = resource
        return next()
      })
      .catch(e => next(e))
  }

  const get = (req, res) => res.json(req.dbResource)

  const create = (req, res, next) => {
    model
      .create(createCb(req.body))
      .then(saved => {
        res.json(saved)
      })
      .catch(e => next(e))
  }

  const update = (req, res, next) => {
    req.dbResource
      .update(req.body)
      .then(() => res.sendStatus(204))
      .catch(e => next(e))
  }

  const remove = (req, res, next) => {
    req.dbResource
      .destroy()
      .then(() => res.sendStatus(204))
      .catch(e => next(e))
  }

  const list = (req, res, next) => {
    const { limit = 50, offset = 0 } = req.query

    model
      .findAll({
        limit,
        offset
      })
      .then(resources => res.json(resources))
      .catch(e => next(e))
  }

  return { load, get, create, update, remove, list }
}

module.exports = { loadController }