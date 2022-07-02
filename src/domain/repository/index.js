const UserRepository = require('./user')

module.exports = ({ database, logger }) => {
  return {
    userRepository: UserRepository({ database }),
  }
}
