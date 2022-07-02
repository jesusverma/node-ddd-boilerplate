const User = require('src/domain/models/user')

module.exports = ({ database }) => {
  const add = async (user, t) => {
    const data = toDatabase(user)

    // inset into table user (1,2,3,4) raw query
    const new_user = await database.models.user.create(data, {
      transaction: t,
    })

    return toDomain(new_user) // convert / serailize data a/t user friendlay
  }

  const getAll = async (user, t) => {
    const new_user = await database.models.user.findAll({
      //   where: constraint,
      transaction: t,
    })

    return toDomain(new_user[0])
  }

  const toDomain = ({ dataValues }) => {
    return new User({
      uid: dataValues.uid,
      LastName: dataValues.LastName,
      FirstName: dataValues.FirstName,
      Address: dataValues.Address,
      City: dataValues.City,
    })
  }

  const toDatabase = (entity) => {
    return {
      uid: entity.uid,
      LastName: entity.LastName,
      FirstName: entity.FirstName,
      Address: entity.Address,
      City: entity.City,
    }
  }

  return {
    add,
    getAll,
  }
}
